import { randomUUID } from 'crypto'
import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const id = () =>
  text('id')
    .primaryKey()
    .$default(() => randomUUID())

const createdAt = () =>
  text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()

export const users = sqliteTable('users', {
  id: id(),
  createdAt: createdAt(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
})

export const profiles = sqliteTable('profiles', {
  id: id(),
  createdAt: createdAt(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
})

export const platforms = sqliteTable('platforms', {
  id: id(),
  createdAt: createdAt(),
  profileId: integer('profile_id')
    .references(() => profiles.id)
    .notNull(),
  platformName: text('name').unique().notNull(),
  link: text('link').notNull(),
})

export const userRelations = relations(users, ({ one }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
}))

export const profileRelations = relations(profiles, ({ many }) => ({
  platforms: many(platforms),
}))

export const platformRelations = relations(platforms, ({ one }) => ({
  platform: one(profiles, {
    fields: [platforms.profileId],
    references: [profiles.id],
  }),
}))
