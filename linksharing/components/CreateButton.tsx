'use client'

import { Button } from 'flowbite-react'
import { customThemeButton } from '../utils/helperTheme'
import LinkContent from './LinkContent'
import { Key, useState } from 'react'

function CreateButton() {
  const [Links, setLinks] = useState([]) // [

  function eventHandler() {}

  function isRemove() {}

  return (
    <>
      <div className="flex justify-center rounded-md hover:bg-purple-100">
        <Button
          onClick={eventHandler}
          theme={customThemeButton}
          size="xl"
          fullSized
          color="lightpurple">
          + Add New Link
        </Button>
      </div>
      {Links.map((link: { id: Key }) => (
        <LinkContent key={link.id} remove={isRemove} />
      ))}
    </>
  )
}

export default CreateButton
