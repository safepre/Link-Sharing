'use client'

import { Button } from 'flowbite-react'
import { customThemeInput } from '@/utils/helperTheme'

const SaveButton = () => {
  return (
    <>
      <div className="border-t absolute inset-x-0 bottom-0 h-16 ">
        <div className="flex justify-end items-center h-full mr-7 ">
          <Button theme={customThemeInput} color="purple">
            Save
          </Button>
        </div>
      </div>
    </>
  )
}

export default SaveButton
