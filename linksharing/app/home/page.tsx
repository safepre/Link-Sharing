import { getOneProfile } from '@/utils/profile'
import { getCurrentUser } from '@/utils/users'
import UserDisplay from '@/components/UserDisplay'

const HomePage = async () => {
  const user = await getCurrentUser()
  const id = (await getOneProfile(user.id)) || ''

  return (
    <>
      <UserDisplay id={id} />
    </>
  )
}

export default HomePage
