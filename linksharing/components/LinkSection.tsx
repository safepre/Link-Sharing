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
    <div className="flex flex-col h-[580px] max-h-[580px]">
      <div className="flex justify-center rounded-md hover:bg-purple-100 px-7  mb-5">
        <Button
          onClick={addLinkItem}
          theme={customThemeButton}
          size="xl"
          fullSized
          color="lightpurple">
          + Add New Link
        </Button>
      </div>
      <div className="relative px-7 overflow-y-auto max-h-[70%]">
        {LinkItem.map(item => (
          <LinkContent
            key={item.id}
            item={item}
            remove={() => removeItem(item.id)}
            updateItem={updateLinkItem}
            platforms={platforms}
          />
        ))}
      </div>
      <div className="bg-white mt-auto rounded-md h-16 flex justify-end p-3">
        <SaveButton color="purple" type="submit" label={'Save'} />
      </div>
    </div>
  )
}

export default LinkSection
