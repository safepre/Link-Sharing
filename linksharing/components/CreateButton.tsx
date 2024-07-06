'use client'

import { Button } from 'flowbite-react'
import { customThemeButton } from '../utils/helperTheme'
import LinkContent from './LinkContent'

function CreateButton({
  removeItem,
  addLinkItem,
  LinkItem,
  updateLinkItem,
  platforms,
}) {
  return (
    <>
      <div className="flex justify-center rounded-md hover:bg-purple-100">
        <Button
          onClick={addLinkItem}
          theme={customThemeButton}
          size="xl"
          fullSized
          color="lightpurple">
          + Add New Link
        </Button>
      </div>
      {LinkItem.map(item => (
        <LinkContent
          key={item.id}
          item={item}
          remove={() => removeItem(item.id)}
          updateItem={updateLinkItem}
          platforms={platforms}
        />
      ))}
    </>
  )
}

export default CreateButton
