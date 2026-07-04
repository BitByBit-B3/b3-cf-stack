import type { ErrorHandler } from 'hono'
import type { Env } from './types'

export const onError: ErrorHandler<Env> = (err, c) => {
  const status = 'status' in err && typeof err.status === 'number' ? err.status : 500
  const code = 'code' in err && typeof err.code === 'string' ? err.code : 'INTERNAL_ERROR'
  const message = err.message || 'An unexpected error occurred'

  return c.json(
    {
      error: { code, message },
    },
    status as any,
  )
}
