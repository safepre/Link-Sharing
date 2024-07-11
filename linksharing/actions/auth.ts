'use server'
import { cookies } from 'next/headers'
import { signin, signup } from '@/utils/authTools'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { COOKIE_NAME } from '@/utils/constants'

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8).optional(),
})

export const registerUser = async (prevState: any, formData: FormData) => {
  const result = authSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (result.error) {
    let errorMessage = ''
    result.error.issues.forEach(issue => {
      errorMessage = issue.message
    })
    return { message: errorMessage }
  }

  try {
    const { token } = await signup(result.data)
    cookies().set(COOKIE_NAME, token)
  } catch (error) {
    return { message: 'Failed to sign you up' }
  }
  redirect('/home')
}

export const signinUser = async (prevState: any, formData: FormData) => {
  const data = authSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  try {
    const { token } = await signin(data)
    cookies().set(COOKIE_NAME, token)
  } catch (e) {
    return { message: 'Failed to sign you in' }
  }
  redirect('/home')
}
