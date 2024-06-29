'use client'
import { NavbarComponent } from '@/components/NavBar'
import CreateButton from '../../components/CreateButton'
import LinkContent from '../../components/LinkContent'
import Display from '../../components/Display'
import { useState } from 'react'
import { customThemeInput } from '../../utils/helperTheme'
import { Button } from 'flowbite-react'
import InputForms from '../../components/InputForms'

const HomeLayout = ({ children }) => {
  const [selectedButton, setSelectedButton] = useState('profile')
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '' })
  const [selectedPlatform, setSelectedPlatform] = useState([])
  return (
    <>
      <div className="bg-zinc-50">
        <div className="p-2 px-6">
          <NavbarComponent
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
          />
        </div>
        <div className="mt-3 flex justify-center gap-6 px-6 ">
          <div className="flex justify-center items-center bg-white w-[1000px] h-[725px] rounded-md">
            <Display user={user} selectedPlatform={selectedPlatform} />
          </div>
          {selectedButton === 'profile' ? (
            <div className="overflow-auto relative bg-white w-full h-[725px] rounded-t-md">
              <div className="m-10">
                <span className="font-semibold text-3xl">
                  Customize your links
                </span>
                <div className="mt-1 mb-6">
                  <span className="text-sm text-slate-500">
                    Add/edit/remove links below and then share all your profiles
                    with the world!
                  </span>
                </div>
                <CreateButton />
                <LinkContent
                  selectedPlatform={selectedPlatform}
                  setSelectedPlatform={setSelectedPlatform}
                  remove={undefined}
                />
              </div>
              <div className="border-t absolute inset-x-0 bottom-0 h-16 ">
                <div className="flex justify-end items-center h-full mr-7 ">
                  <Button theme={customThemeInput} color="purple">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative bg-white w-full h-[725px]">
              <div className="m-10 ">
                <span className="font-semibold text-3xl">Profile Details</span>
                <div className="mt-1 mb-2">
                  <span className="text-sm text-slate-500">
                    Add your details to create a personal touch to your profile.
                  </span>
                  <div className="flex flex-col mt-7 justify-center items-center">
                    <div className="flex flex-col gap-4">
                      <div className="bg-zinc-100 rounded-lg p-4">
                        <div className="grid grid-cols-3 items-center">
                          <span className="text-slate-500">
                            Profile picture
                          </span>
                          <button className="bg-purple-200 w-[194px] h-[193px] rounded-lg flex justify-center items-center text-purple-700 font-medium">
                            <span>+ Upload Image</span>
                          </button>
                          <span className="text-slate-500 text-sm">
                            Image must be below 1024x1024px. Use PNG or JPG
                            format.
                          </span>
                        </div>
                      </div>
                      <InputForms user={user} setUser={setUser} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t absolute bg-white inset-x-0 bottom-0 h-16">
                <div className="flex justify-end items-center h-full mr-7">
                  <Button theme={customThemeInput} color="purple">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-zinc-50">{children}</div>
    </>
  )
}
export default HomeLayout
