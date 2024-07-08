'use client'

import { TextInput } from 'flowbite-react'
import { customThemeInput } from '../utils/helperTheme'

const ProfileSection = ({ user, setUser }) => {
  const handleInputChange = e => {
    setUser({ ...user, [e.target.id]: e.target.value })
  }

  return (
    <div className="mt-1 mb-2">
      <div className="flex flex-col mt-7 justify-center items-center">
        <div className="flex flex-col gap-4">
          <div className="bg-zinc-100 rounded-lg p-4">
            <div className="grid grid-cols-3 items-center">
              <span className="text-slate-500">Profile picture</span>
              <button className="bg-purple-200 w-[194px] h-[193px] rounded-lg flex justify-center items-center text-purple-700 font-medium">
                <span>+ Upload Image</span>
              </button>
              <span className="text-slate-500 text-sm">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </span>
            </div>
          </div>
          <div className="bg-zinc-100 rounded-lg w-[739px] bg-gray-300">
            <div className="flex flex-row justify-between mt-3.5">
              <span className="m-4 text-slate-500">First name*</span>
              <TextInput
                className="m-2 w-[432px] mr-5"
                theme={customThemeInput}
                color="white"
                id="firstName"
                type="url"
                placeholder="e.g. John"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-row justify-between">
              <span className="m-4 text-slate-500">Last name*</span>
              <TextInput
                className="m-2 w-[432px] mr-5"
                theme={customThemeInput}
                color="white"
                id="lastName"
                type="url"
                placeholder="e.g. Appleseed"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-row justify-between">
              <span className="m-4 text-slate-500"> Email</span>
              <TextInput
                className="m-2 w-[432px] mr-5"
                theme={customThemeInput}
                color="white"
                id="email"
                type="url"
                placeholder="e.g. japple@email.com"
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSection
