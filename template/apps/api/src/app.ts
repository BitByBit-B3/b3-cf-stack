import { createAuth } from '@repo/core'
import { Hono, type MiddlewareHandler } from 'hono'
import { withContext } from './lib/context'
import { onError } from './lib/on-error'
import type { Env } from './lib/types'
import { helloRoutes } from './routes/hello'

export function createRpcApp(contextMw: MiddlewareHandler<Env>) {
  return new Hono<Env>()
    .onError(onError)
    .use('*', contextMw)
    .route('/hello', helloRoutes)
}

export type AppType = ReturnType<typeof createRpcApp>

const app = new Hono<Env>()

app.onError(onError)

app.on(['GET', 'POST'], '/api/auth/*', (c) => createAuth(c.env).handler(c.req.raw))

app.route('/api/rpc', createRpcApp(withContext))

export { app }
