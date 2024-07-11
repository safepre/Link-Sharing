'use server'

import { z } from 'zod'
import { postProfile } from '@/utils/profile'
import { getCurrentUser } from '@/utils/users'
import { revalidateTag } from 'next/cache'

const profileSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  userId: z.string(),
})

export const createProfile = async (prevState: any, formData: FormData) => {
  const user = await getCurrentUser()

  const result = profileSchema.safeParse({
    first_name: formData.get('firstname'),
    last_name: formData.get('lastname'),
    email: formData.get('email'),
    userId: user.id,
  })

  if (result.error) {
    let errorMessage = ''
    result.error.issues.forEach(issue => {
      errorMessage = issue.message
    })
    return { message: errorMessage }
  }
  try {
    await postProfile(result.data)
    revalidateTag('profile')
  } catch (error) {
    return { message: 'Invalid credentials' }
  }
}
