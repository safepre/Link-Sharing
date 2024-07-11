'use client'

import React from 'react'

const Display = ({ LinkItems, platforms }) => {
  return (
    <>
      {/* Platform Button */}
      {LinkItems.map(item => (
        <div
          key={item.id}
          className={`flex justify-center items-center w-[220px] h-[40px] font-medium text-sm text-white ${
            platforms[item.platform]?.bgColor ||
            'bg-gray-300' ||
            'bg-black' ||
            'bg-red-500' ||
            'bg-blue-500'
          } rounded-md`}>
          {item.platform}
        </div>
      ))}
    </>
  )
}

export default Display
