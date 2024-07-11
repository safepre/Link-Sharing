import 'server-only'
import { COOKIE_NAME } from './constants'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUserFromToken } from './authTools'

export const getCurrentUser = async () => {
  const token = cookies().get(COOKIE_NAME)
  if (!token) redirect('/')
  const user = await getUserFromToken(token)
  if (!user) redirect('/')

  return user
}
