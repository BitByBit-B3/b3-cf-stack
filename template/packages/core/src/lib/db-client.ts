import type { D1Database, Fetcher, ImagesBinding, KVNamespace, R2Bucket } from '@cloudflare/workers-types'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../db/schema'

export interface CloudflareEnv {
  DB?: D1Database
  ASSETS?: Fetcher
  STORAGE_BUCKET?: R2Bucket
  IMAGES?: ImagesBinding
  BETTER_AUTH_SECRET?: string
  BETTER_AUTH_URL?: string
  NODE_ENV?: string
  R2_PUBLIC_URL?: string
}

export function getDB(env: CloudflareEnv) {
  const db = env.DB
  if (!db) {
    throw new Error('No database binding found. Ensure DB is configured in wrangler.jsonc')
  }
  return drizzle(db, { schema })
}

export type DB = ReturnType<typeof getDB>
