import type { AppType } from '@repo/api/app'
import type { ClientResponse } from 'hono/client'
import { hc } from 'hono/client'
import type { ContentfulStatusCode } from 'hono/utils/http-status'
import superjson from 'superjson'

export class RpcError extends Error {
  readonly code?: string
  readonly status: number
  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = 'RpcError'
    this.status = status
    this.code = code
  }
}

export const client = hc<AppType>('/api/rpc', {
  init: { credentials: 'include' },
})

type Ok<R> = R extends ClientResponse<infer T, 200, 'json'> ? T : never

export async function unwrap<R extends ClientResponse<unknown, ContentfulStatusCode, 'json'>>(
  call: Promise<R>,
): Promise<Ok<R>> {
  const res = await call
  const raw = await res.text()
  const body = raw ? JSON.parse(raw) : null
  if (!res.ok) {
    const err = body as { error?: { code?: string; message?: string } } | null
    throw new RpcError(err?.error?.message ?? `HTTP ${res.status}`, res.status, err?.error?.code)
  }
  return superjson.deserialize(body as never) as Ok<R>
}
