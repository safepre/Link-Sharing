'use client'

import { Spinner } from 'flowbite-react/components/Spinner'
import { useProfile } from '../utils/hooks/useProfile'
import { useAppSelector } from '../lib/hooks'

const UserDisplay = ({ id }) => {
  const userId = id ? id.userId : ''
  const { data, isLoading } = useProfile(userId)
  const user = useAppSelector(state => state.user)
  return (
    <>
      {/* Name */}
      <div className="text-sm text-center font-medium bg-zinc-100 px-2 rounded-md ">
        {isLoading ? (
          <Spinner
            color="purple"
            size="sm"
            aria-label="Purple spinner example"
          />
        ) : (
          `${data ? data.first_name : user.firstName} ${
            data ? data.last_name : user.lastName
          }`
        )}
      </div>

      {/* Email */}
      <div className="text-xs text-center text-gray-600 px-2 bg-zinc-100 rounded-md">
        {isLoading ? (
          <Spinner
            color="purple"
            size="sm"
            aria-label="Purple spinner example"
          />
        ) : (
          `${data ? data.email : user.email}`
        )}
      </div>
    </>
  )
}

export default UserDisplay
