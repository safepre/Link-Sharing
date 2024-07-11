import 'server-only'
import { db } from '@/db/db'
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
  userId: number
}) => {
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
