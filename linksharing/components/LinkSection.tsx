'use client'

import { Button } from 'flowbite-react'
import { customThemeButton } from '../utils/helperTheme'
import LinkContent from './LinkContent'
import SaveButton from './SaveButton'
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { addLinkItem } from '../lib/features/linkSlice'

function LinkSection() {
  const dispatch = useAppDispatch()
  const linkItem = useAppSelector(state => state.link)
  const add = () => {
    dispatch(addLinkItem())
  }
  return (
    <div className="flex flex-col h-[580px] max-h-[580px]">
      <div className="flex justify-center rounded-md hover:bg-purple-100 px-7  mb-5">
        <Button
          onClick={add}
          theme={customThemeButton}
          size="xl"
          fullSized
          color="lightpurple">
          + Add New Link
        </Button>
      </div>
      <div className="relative px-7 overflow-y-auto max-h-[70%]">
        {linkItem.linkItems.map(item => (
          <LinkContent key={item.id} id={item.id} />
        ))}
      </div>
      <div className="bg-white mt-auto rounded-md h-16 flex justify-end p-3">
        <SaveButton color="purple" type="submit" label={'Save'} />
      </div>
    </div>
  )
}

export default LinkSection
