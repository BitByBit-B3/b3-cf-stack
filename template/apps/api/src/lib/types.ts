import type { AuthUser, CloudflareEnv, DB } from '@repo/core'

export type Env = {
  Bindings: CloudflareEnv
  Variables: {
    db: DB
    user: AuthUser | null
  }
}
