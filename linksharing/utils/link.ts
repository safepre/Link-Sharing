import 'server-only'
import { db } from '@/db/db'
import { delay } from '@/utils/delay'
import { eq } from 'drizzle-orm'
import { platforms } from '@/db/schema'

export const getPlatforms = async (profileId: string) => {
  await delay()
  return (
    db.query.platforms.findMany({
      where: eq(platforms.profileId, profileId),
    }) || ''
  )
}

export const deletePlatform = async (id: string) => {
  await delay()
  const remove = await db
    .delete(platforms)
    .where(eq(platforms.id, id))
    .returning()
  return remove
}
