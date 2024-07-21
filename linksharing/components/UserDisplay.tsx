'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setUser } from '@/lib/features/userSlice'

const UserDisplay = ({ id }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)
  useEffect(() => {
    if (id) {
      dispatch(
        setUser({
          firstName: id.first_name,
          lastName: id.last_name,
          email: id.email,
        })
      )
    }
  }, [dispatch, id])
  return (
    <>
      {/* Name */}
      <div className="text-sm text-center font-medium bg-zinc-100 px-2 rounded-md ">
        {`${user.firstName ? user.firstName : id ? id.first_name : ''} ${
          user.lastName ? user.lastName : id ? id.last_name : ''
        }`}
      </div>
      {/* Email */}
      <div className="text-xs text-center text-gray-600 px-2 bg-zinc-100 rounded-md">
        {`${user.email ? user.email : id ? id?.email : ''}`}
      </div>
    </>
  )
}

export default UserDisplay
