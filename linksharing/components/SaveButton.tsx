'use client'

import { Button } from 'flowbite-react'
import { customThemeInput } from '@/utils/helperTheme'
import { useFormStatus } from 'react-dom'

const SaveButton = ({ label, ...btnProps }) => {
  const { pending } = useFormStatus()

  return (
    <>
      <div className="flex justify-end items-center h-full mr-7 ">
        <Button
          {...btnProps}
          type="submit"
          isProcessing={pending}
          theme={customThemeInput}
          color="purple">
          {label}
        </Button>
      </div>
    </>
  )
}

export default SaveButton
