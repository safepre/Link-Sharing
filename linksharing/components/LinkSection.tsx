'use client'

import { Button } from 'flowbite-react'
import { customThemeButton, customThemeInput } from '../utils/helperTheme'
import LinkContent from './LinkContent'
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { addLinkItem } from '../lib/features/linkSlice'
import { useTransition } from 'react'
import { saveLinkItems } from '../actions/link'

function LinkSection() {
  const [isPending, startTransition] = useTransition()
  const dispatch = useAppDispatch()
  const linkItem = useAppSelector(state => state.link)
  const add = () => {
    dispatch(addLinkItem())
  }

  const save = () => {
    startTransition(() => {
      saveLinkItems(linkItem.linkItems)
    })
  }

  return (
    <div className="flex flex-col h-[580px] max-h-[580px]">
      <div className="flex justify-center rounded-md hover:bg-purple-100 px-7 mb-5">
        <Button
          onClick={add}
          theme={customThemeButton}
          size="xl"
          fullSized
          color="lightpurple">
          + Add New Link
        </Button>
      </div>
      <div className="relative px-7 overflow-y-auto max-h-[75%]">
        {linkItem.linkItems.map(item => (
          <LinkContent key={item.id} id={item.id} />
        ))}
      </div>
      <div className="bg-white mt-auto rounded-md h-16 flex justify-end p-3">
        <div className="justify-end items-center h-full mr-7 ">
          <Button
            onClick={save}
            type="submit"
            isProcessing={isPending}
            theme={customThemeInput}
            color="purple">
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LinkSection
