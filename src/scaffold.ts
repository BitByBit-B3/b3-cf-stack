import { spawn } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { log } from '@clack/prompts'
import { cyan, green } from 'kleur/colors'

export interface Vars {
  projectName: string
  packageName: string
  description: string
}

const TEMPLATE_DIR = new URL('../template', import.meta.url).pathname

// Files that should be processed for variable substitution
const TEXT_EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.json', '.jsonc', '.yml', '.yaml',
  '.toml', '.md', '.css', '.html', '.txt', '.gitignore',
  '.env', '.npmrc', '.gitattributes',
])

function isTextFile(filePath: string): boolean {
  const ext = filePath.split('.').pop()
  if (!ext) return false
  // Handle files like .gitignore (no extension before the dot)
  const basename = filePath.split('/').pop() ?? filePath
  if (basename === '.gitignore' || basename === '.env' || basename === '.npmrc') return true
  return TEXT_EXTENSIONS.has('.' + ext)
}

function processContent(content: string, vars: Vars): string {
  return content
    .replace(/\{\{projectName\}\}/g, vars.projectName)
    .replace(/\{\{packageName\}\}/g, vars.packageName)
    .replace(/\{\{description\}\}/g, vars.description)
}

function copyDir(src: string, dest: string, vars: Vars): void {
  if (!existsSync(dest)) mkdirSync(dest, { recursive: true })

  const entries = readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = join(src, entry.name)
    const destPath = join(dest, entry.name)

    if (entry.name === 'node_modules') continue

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, vars)
    } else {
      if (isTextFile(entry.name)) {
        const content = readFileSync(srcPath, 'utf-8')
        writeFileSync(destPath, processContent(content, vars))
      } else {
        copyFileSync(srcPath, destPath)
      }
    }
  }
}

function exec(cmd: string, args: string[], cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: true,
    })
    proc.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${cmd} exited with code ${code}`))
    })
    proc.on('error', reject)
  })
}

export async function scaffold(vars: Vars, dir: string, runInstall: boolean, gitInit: boolean): Promise<void> {
  const dest = resolve(process.cwd(), dir)

  if (existsSync(dest) && readdirSync(dest).length > 0) {
    log.error(`Directory "${dir}" already exists and is not empty.`)
    process.exit(1)
  }

  log.info(`Scaffolding project in ${cyan(dest)}...`)
  mkdirSync(dest, { recursive: true })

  copyDir(TEMPLATE_DIR, dest, vars)

  log.success('Template files copied.')

  if (gitInit) {
    log.info('Initializing git repository...')
    try {
      await exec('git', ['init'], dest)
      log.success('Git repository initialized.')
    } catch {
      log.warn('Git init failed — skipping.')
    }
  }

  if (runInstall) {
    log.info('Installing dependencies with bun...')
    try {
      await exec('bun', ['install'], dest)
      log.success('Dependencies installed.')
    } catch {
      log.warn('bun install failed — run it yourself later.')
    }
  }
}
