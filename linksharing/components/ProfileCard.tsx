'use client'
import { Card } from 'flowbite-react'
import { customAvatar, customCard } from '../utils/helperTheme'
import { Avatar } from 'flowbite-react'
import { useAppSelector } from '../lib/hooks'
import { platforms } from '@/utils/platforms'

const ProfileCard = () => {
  const user = useAppSelector(state => state.user)
  const linkItems = useAppSelector(state => state.link.linkItems)
  return (
    <>
      <Card theme={customCard} className="max-w-sm">
        <div className="flex flex-col items-center">
          <div className="">
            <Avatar
              theme={customAvatar}
              size="lg"
              bordered
              color="purple"
              rounded
            />
          </div>
          <h5 className="mt-3 mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {`${user.firstName} ${user.lastName}`}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </span>
          {linkItems.map(item => (
            <div
              key={item.id}
              className={`flex justify-center items-center mt-2 w-[220px] h-[40px] font-medium text-sm text-white ${
                platforms[item.platform as keyof typeof platforms]?.bgColor ||
                'bg-gray-300' ||
                'bg-red-500' ||
                'bg-black' ||
                'bg-blue-500'
              } rounded-md mb-2`}>
              {item.platform}
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}

export default ProfileCard
