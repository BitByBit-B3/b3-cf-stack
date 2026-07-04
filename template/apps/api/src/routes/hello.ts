import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { superjson } from 'superjson'
import type { Env } from '../lib/types'

const hello = new Hono<Env>()

// GET /api/rpc/hello
hello.get('/', (c) => {
  const user = c.get('user')
  return c.json(
    superjson.serialize({
      message: 'Hello from Hono + Cloudflare Workers!',
      user: user?.email ?? 'anonymous',
      timestamp: new Date(),
    }),
  )
})

// GET /api/rpc/hello/:name
hello.get(
  '/:name',
  zValidator(
    'param',
    z.object({ name: z.string().min(1) }),
  ),
  (c) => {
    const { name } = c.req.valid('param')
    return c.json(
      superjson.serialize({
        message: `Hello, ${name}!`,
        timestamp: new Date(),
      }),
    )
  },
)

export { hello as helloRoutes }
