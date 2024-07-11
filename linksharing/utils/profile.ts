import 'server-only'
import { db } from '@/db/db'
import { delay } from '@/utils/delay'
import { eq } from 'drizzle-orm'
import { profiles } from '@/db/schema'

export const postProfile = async ({
  first_name,
  last_name,
  email,
  userId,
}: {
  first_name: string
  last_name: string
  email: string
  userId: string
}) => {
  await delay(2000)
  const rows = await db
    .insert(profiles)
    .values({ first_name, last_name, email, userId })
    .returning({
      email: profiles.email,
      first_name: profiles.first_name,
      last_name: profiles.last_name,
    })
  return rows
}

export const getOneProfile = async (userId: string) => {
  await delay()
  return db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  })
}
