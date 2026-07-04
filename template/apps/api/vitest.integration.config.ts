import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    include: ['test/integration/**/*.test.ts'],
    globalSetup: ['test/setup/global-setup.ts'],
    setupFiles: ['test/setup/setup-file.ts'],
  },
})
