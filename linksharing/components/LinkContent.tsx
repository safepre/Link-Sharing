'use client'

import { Dropdown, Label, TextInput } from 'flowbite-react'
import { customThemeDropdown, customThemeInput } from '../utils/helperTheme'
import { platforms } from '../utils/platforms'
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import {
  removeLinkItem,
  updateLinkItem,
  setSelectedLinkId,
} from '../lib/features/linkSlice'

function LinkContent({ id }) {
  const dispatch = useAppDispatch()
  const linkItem = useAppSelector(state =>
    state.link.linkItems.find(item => item.id === id)
  )

  const handlePlatformChange = platform => {
    dispatch(updateLinkItem({ id, updatedData: { platform } }))
  }

  const handleUrlChange = e => {
    dispatch(updateLinkItem({ id, updatedData: { url: e.target.value } }))
  }

  const remove = () => {
    dispatch(removeLinkItem(id))
  }

  return (
    <div className="rounded-md bg-gray-100 p-5 mt-5">
      <div className="flex justify-between">
        <span className="font-semibold text-l">Link</span>
        <button onClick={remove} className="text-gray-500">
          Remove
        </button>
      </div>
      <div className="mb-2 block">
        <Label htmlFor="platform" value="Platform" />
      </div>
      <Dropdown
        theme={customThemeDropdown}
        label={linkItem.platform || 'Select a platform'}
        inline>
        {Object.keys(platforms).map(platform => (
          <Dropdown.Item
            key={platform}
            onClick={() => handlePlatformChange(platform)}>
            {platform}
            <Dropdown.Divider />
          </Dropdown.Item>
        ))}
      </Dropdown>
      <div className="mb-2 block mt-2">
        <Label htmlFor="url" value="Link" />
      </div>
      <TextInput
        theme={customThemeInput}
        color="white"
        id="url"
        type="url"
        value={linkItem.url}
        onChange={handleUrlChange}
        placeholder="e.g. https://www.github.com/safepre"
        required
      />
    </div>
  )
}

export default LinkContent
