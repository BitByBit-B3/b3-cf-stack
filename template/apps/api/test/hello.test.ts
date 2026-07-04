import { describe, expect, it } from 'vitest'

describe('hello route', () => {
  it('should pass a basic smoke test', () => {
    expect(1 + 1).toBe(2)
  })

  it('should have the app module exported', async () => {
    // Smoke test - just verify modules can be imported
    const { app } = await import('../src/app')
    expect(app).toBeDefined()
  })
})
