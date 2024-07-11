import { getOneProfile } from '@/utils/profile'
import { getCurrentUser } from '@/utils/users'

const display = async () => {
  const user = await getCurrentUser()
  const profile = await getOneProfile(user.id)

  return (
    <>
      {/* Name */}
      <div className="text-sm text-center font-medium bg-zinc-100 px-2 rounded-md ">
        {profile?.first_name} {profile?.last_name}
      </div>

      {/* Email */}
      <div className="text-xs text-center text-gray-600 px-2 bg-zinc-100 rounded-md">
        {profile?.email}
      </div>
    </>
  )
}

export default display
