'use client'

import { Button } from 'flowbite-react'
import { customThemeButton } from '../utils/helperTheme'

function CreateButton() {
  return (
    <div className="flex justify-center rounded-md">
      <Button theme={customThemeButton} size="xl" fullSized color="lightpurple">
        + Add New Link
      </Button>
    </div>
  )
}

export default CreateButton
