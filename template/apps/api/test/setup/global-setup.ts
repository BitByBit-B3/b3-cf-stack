import { execSync } from 'node:child_process'

export async function setup() {
  // Apply D1 migrations for test environment
  execSync('bun run db:migrate', { stdio: 'inherit' })
}

export async function teardown() {
  // Cleanup test data if needed
}
