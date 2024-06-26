import { migrate } from 'drizzle-orm/libsql/migrator'
import { db } from './db'
migrate(db, { migrationsFolder: 'drizzle' })
