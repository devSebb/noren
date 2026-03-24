import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

type DrizzleDB = ReturnType<typeof drizzle<typeof schema>>

let _db: DrizzleDB | null = null

function getDb(): DrizzleDB {
  if (!_db) {
    const url = process.env.SUPABASE_DB_URL
    if (!url) {
      throw new Error("Missing SUPABASE_DB_URL environment variable")
    }
    const client = postgres(url, { prepare: false })
    _db = drizzle(client, { schema })
  }
  return _db
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = new Proxy({} as DrizzleDB, {
  get(_target, prop) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (getDb() as any)[prop]
  },
})

export * from "./schema"
