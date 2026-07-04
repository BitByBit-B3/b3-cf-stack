#!/usr/bin/env node

import { cancel, confirm, intro, isCancel, outro, select, text } from '@clack/prompts'
import { bgCyan, bold, cyan, green, reset, yellow } from 'kleur/colors'
import { scaffold } from './scaffold.js'

intro(reset(bgCyan(bold(' create-b3-cf-app '))))

const projectDir = await text({
  message: 'Where should we create your project?',
  placeholder: './my-cf-app',
  validate: (v) => {
    if (!v || v.trim().length === 0) return 'Project directory is required'
    if (!/^[a-z0-9._-]+$/.test(v.trim()) && !v.trim().startsWith('./')) {
      return 'Use a valid directory name (e.g. my-app or ./my-app)'
    }
  },
})
if (isCancel(projectDir)) { cancel('Cancelled.'); process.exit(0) }

const dir = projectDir.trim().replace(/^\.\//, '')
const packageName = dir.replace(/[^a-z0-9_-]/g, '-').toLowerCase()

const description = await text({
  message: 'Project description?',
  placeholder: 'A Cloudflare Workers + React application',
})
if (isCancel(description)) { cancel('Cancelled.'); process.exit(0) }

const install = await confirm({
  message: 'Run bun install after scaffolding?',
  initialValue: true,
})
if (isCancel(install)) { cancel('Cancelled.'); process.exit(0) }

const gitInit = await confirm({
  message: 'Initialize a git repository?',
  initialValue: true,
})
if (isCancel(gitInit)) { cancel('Cancelled.'); process.exit(0) }

const vars = {
  projectName: dir,
  packageName,
  description: description || 'A Cloudflare Workers + React application',
}

await scaffold(vars, dir, install, gitInit)

outro(
  green('Done!') +
    '\n\n' +
    cyan('  cd ' + dir) +
    '\n' +
    cyan('  bun run dev') +
    '\n\n' +
    yellow('  📖 Docs: https://github.com/BitByBit-B3/create-b3-cf-app'),
)
