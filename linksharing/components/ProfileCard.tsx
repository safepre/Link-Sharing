'use client'
import { Card } from 'flowbite-react'
import { customAvatar, customCard } from '../utils/helperTheme'
import { Avatar } from 'flowbite-react'
const ProfileCard = () => {
  return (
    <>
      <Card theme={customCard} className="max-w-sm">
        <div className="flex flex-col items-center pb-10">
          <div className="">
            <Avatar
              theme={customAvatar}
              size="lg"
              bordered
              color="purple"
              rounded
            />
          </div>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Bonnie Green
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Visual Designer
          </span>
        </div>
      </Card>
    </>
  )
}

export default ProfileCard
