'use server'
import { db } from '@/db/db'
import { platforms } from '@/db/schema'
import { delay } from '@/utils/delay'
import { getCurrentUser } from '@/utils/users'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { deletePlatform, getPlatforms } from '@/utils/link'

export const saveLinkItems = async (
  items: Array<{ platform: string; url: string }>
) => {
  await delay(2000)
  const user = await getCurrentUser()

  try {
    const linkItemSchema = z.object({
      platform: z
        .string()
        .refine(val => ['LinkedIn', 'Youtube', 'GitHub', 'X'].includes(val), {
          message: 'Platform must be one of: LinkedIn, Youtube, GitHub, X',
        }),
      url: z.string().url(),
      id: z.string(),
    })
    const validatedItems = items.map(item => linkItemSchema.parse(item))
    const existingItems = await db
      .select()
      .from(platforms)
      .where(eq(platforms.profileId, user.profile?.id ?? ''))
    const itemsToInsert = []
    const itemsToUpdate = []

    for (const item of validatedItems) {
      const existingItem = existingItems.find(ei => ei.id === item.id)

      if (!existingItem) {
        itemsToInsert.push({
          id: item.id,
          platformName: item.platform,
          profileId: user.profile?.id,
          link: item.url,
        })
      } else if (
        existingItem.link !== item.url ||
        existingItem.platformName !== item.platform
      ) {
        itemsToUpdate.push({
          id: item.id,
          link: item.url,
          platformName: item.platform,
        })
      }
    }

    if (itemsToInsert.length > 0) {
      await db.insert(platforms).values(itemsToInsert)
    }
    console.log(itemsToUpdate)
    for (const item of itemsToUpdate) {
      await db
        .update(platforms)
        .set({ link: item.link, platformName: item.platformName })
        .where(eq(platforms.id, item.id))
    }
    return { message: 'Links saved successfully' }
  } catch (e) {
    return { message: 'Failed to save links' }
  }
}

export const getPlatformId = async (profileId: string) => {
  const profile = await getPlatforms(profileId)
  return profile
}

export const deletePlatformId = async (id: string) => {
  const removePlatform = await deletePlatform(id)
  return removePlatform
}
