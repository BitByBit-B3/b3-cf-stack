import { getDB, getSession } from '@repo/core'
import type { MiddlewareHandler } from 'hono'
import type { Env } from './types'

export const withContext: MiddlewareHandler<Env> = async (c, next) => {
  if (!c.get('db')) {
    c.set('db', getDB(c.env))
  }
  if (c.get('user') === undefined) {
    const session = await getSession({ headers: c.req.raw.headers, env: c.env })
    c.set('user', session?.user ?? null)
  }
  await next()
}
