'use client'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setLinkItems } from '../lib/features/linkSlice'
import { platforms } from '@/utils/platforms' // Make sure this path is correct

const DropdownDisplay = ({ id }) => {
  const dispatch = useAppDispatch()
  const linkItems = useAppSelector(state => state.link.linkItems)

  useEffect(() => {
    if (id) {
      const linkItemsData = id.map(item => ({
        id: item.id,
        url: item.link,
        platform: item.platformName,
      }))
      dispatch(setLinkItems(linkItemsData))
    }
  }, [id, dispatch])

  return (
    <>
      {linkItems.map(item => (
        <div
          key={item.id}
          className={`flex justify-center items-center w-[220px] h-[40px] font-medium text-sm text-white ${
            platforms[item.platform as keyof typeof platforms]?.bgColor ||
            'bg-gray-300' ||
            'bg-red-500' ||
            'bg-black' ||
            'bg-blue-500'
          } rounded-md mb-2`}>
          {item.platform}
        </div>
      ))}
    </>
  )
}

export default DropdownDisplay
