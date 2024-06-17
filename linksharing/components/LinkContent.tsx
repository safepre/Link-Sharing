'use client'

import { Dropdown, Label, TextInput } from 'flowbite-react'
import { customThemeDropdown, customThemeInput } from '../utils/helperTheme'
function LinkContent() {
  return (
    <>
      <div className="rounded-md bg-gray-100 p-5">
        <span className="font-semibold text-l">Link</span>
        <button className="text-gray-500 ml-96">Remove</button>
        <div className="mb-2 block">
          <Label htmlFor="url" value="Platform" />
        </div>

        <Dropdown theme={customThemeDropdown} label="Dropdown button" inline>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Separated link</Dropdown.Item>
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
