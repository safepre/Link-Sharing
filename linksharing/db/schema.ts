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
  userId: text('user_id')
    .unique()
    .references(() => users.id),
  email: text('email').notNull(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
})

export const platforms = sqliteTable('platforms', {
  id: text('id').primaryKey(),
  createdAt: createdAt(),
  profileId: text('profile_id').references(() => profiles.id),
  platformName: text('name').notNull(),
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
