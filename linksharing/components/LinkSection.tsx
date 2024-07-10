'use client'

import { Button } from 'flowbite-react'
import { customThemeButton } from '../utils/helperTheme'
import LinkContent from './LinkContent'
import SaveButton from './SaveButton'

function LinkSection({
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
      <div className="border-t absolute inset-x-0 bottom-0 h-16 ">
        <SaveButton color="purple" type="submit" label={'Save'} />
      </div>
    </>
  )
}

export default LinkSection
