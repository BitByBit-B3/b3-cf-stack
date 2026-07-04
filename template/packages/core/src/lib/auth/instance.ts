import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { getDB, type CloudflareEnv } from '../db-client'
import { account, session, user, verification } from '../../db/schema'

export function createAuth(env: CloudflareEnv) {
  return betterAuth({
    database: drizzleAdapter(getDB(env), {
      provider: 'sqlite',
      schema: {
        user,
        session,
        account,
        verification,
      },
    }),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {},
  })
}
