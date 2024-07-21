import { getOneProfile } from '@/utils/profile'
import { getCurrentUser } from '@/utils/users'
import UserDisplay from '@/components/UserDisplay'
import DropdownDisplay from '@/components/DropdownDisplay'
import { getPlatforms } from '@/utils/link'

const HomePage = async () => {
  const user = await getCurrentUser()

  const userid = (await getOneProfile(user.id)) || ''
  const profileid = await getPlatforms(user.profile?.id || '')
  return (
    <>
      <UserDisplay id={userid} />
      <DropdownDisplay id={profileid} />
    </>
  )
}

export default HomePage
