'use server'

import { z } from 'zod'
import { delay } from '@/utils/delay'
import { postProfile } from '@/utils/profile'
import { getCurrentUser } from '@/utils/users'

const profileSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  userId: z.string(), // Add this line
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
    await delay(2000)
    await postProfile(result.data)
  } catch (error) {
    console.error(error) // Log the error
    return { message: 'Invalid credentials' }
  }
}
