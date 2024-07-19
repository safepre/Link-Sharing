import React from 'react'
import { useAppSelector } from '../lib/hooks'
import { platforms } from '../utils/platforms'

const DropdownDisplay = () => {
  const linkItem = useAppSelector(state => state.link)

  return (
    <>
      {/* Platform Button */}
      {linkItem.linkItems.map(item => (
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

export default DropdownDisplay
