'use client'

import { Dropdown, Label, TextInput } from 'flowbite-react'
import { customThemeDropdown, customThemeInput } from '../utils/helperTheme'

function LinkContent({ item, remove, updateItem, platforms }) {
  const handlePlatformChange = platform => {
    updateItem(item.id, { platform })
  }

  const handleUrlChange = e => {
    updateItem(item.id, { url: e.target.value })
  }
  return (
    <>
      <div className="rounded-md bg-gray-100 p-5 mt-5">
        <div className="flex justify-between">
          <span className="font-semibold text-l">Link</span>
          <button onClick={remove} className="text-gray-500">
            Remove
          </button>
        </div>
        <div className="mb-2 block">
          <Label htmlFor="url" value="Platform" />
        </div>
        <Dropdown
          theme={customThemeDropdown}
          label={item.platform || 'Select a platform'}
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
          value={item.url}
          onChange={handleUrlChange}
          placeholder="e.g. https://www.github.com/safepre"
          required
        />
      </div>
    </>
  )
}

export default LinkContent
