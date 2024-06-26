'use client'

import { Dropdown, Label, TextInput } from 'flowbite-react'
import { customThemeDropdown, customThemeInput } from '../utils/helperTheme'
import { useState } from 'react'
function LinkContent({ remove, selectedPlatform, setSelectedPlatform }) {
  const listPlatforms = {
    platforms: {
      GitHub: null,
      X: null,
      Youtube: null,
      Linkedin: null,
    },
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
          label={selectedPlatform ? selectedPlatform : ``}
          inline>
          {Object.keys(listPlatforms.platforms).map((key, index) => (
            <Dropdown.Item
              key={index}
              onClick={() =>
                setSelectedPlatform(Object.keys(listPlatforms.platforms)[index])
              }>
              {Object.keys(listPlatforms.platforms)[index]}
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
          placeholder="e.g. https://www.github.com/safepre"
          required
        />
      </div>
    </>
  )
}

export default LinkContent
