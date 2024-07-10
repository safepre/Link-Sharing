'use client'

import React from 'react'

const Display = ({ LinkItems, user, platforms }) => {
  return (
    <div className="flex flex-col items-center space-y-4 ">
      {/* Profile Picture Placeholder */}
      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-center">
        Profile Picture
      </div>

      {/* Name */}
      <div className="text-sm text-center font-medium bg-zinc-100 px-2 rounded-md ">
        {user.firstName} {user.lastName}
      </div>

      {/* Email */}
      <div className="text-xs text-center text-gray-600 px-2 bg-zinc-100 rounded-md">
        {user.email}
      </div>

      {/* Platform Button */}
      {LinkItems.map(item => (
        <div
          key={item.id}
          className={`flex justify-center items-center w-[220px] h-[40px] font-medium text-sm text-white ${
            platforms[item.platform]?.bgColor || 'bg-gray-300'
          } rounded-md`}>
          {item.platform}
        </div>
      ))}
    </div>
  )
}

export default Display
