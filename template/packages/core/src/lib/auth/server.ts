import type { CloudflareEnv } from '../db-client'
import { createAuth } from './instance'
import type { UserRole } from './types'

export interface AuthUser {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image: string | null
  role: UserRole | null
  banned: boolean | null
}

export interface AuthSession {
  user: AuthUser
  session: {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
  } | null
}

export async function getSession(opts: {
  headers: Headers
  env: CloudflareEnv
}): Promise<AuthSession> {
  const auth = createAuth(opts.env)
  const session = await auth.api.getSession({ headers: opts.headers })
  if (!session) {
    return { user: null as any, session: null }
  }
  return session as unknown as AuthSession
}
