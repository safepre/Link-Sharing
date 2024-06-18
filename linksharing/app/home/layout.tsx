'use client'

import { NavbarComponent } from '@/components/NavBar'
import CreateButton from '../../components/CreateButton'
import Link from 'next/link'
import LinkContent from '../../components/LinkContent'
import { useState } from 'react'

const HomeLayout = ({ children }) => {
  const [selectedButton, setSelectedButton] = useState('profile')

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
          <div className="bg-white w-[1000px] h-[725px]">s</div>
          {selectedButton === 'profile' ? (
            <div className="relative bg-white w-full h-[725px]">
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
              </div>
              <div className="border-t absolute bg-white inset-x-0 bottom-0 h-16"></div>
            </div>
          ) : (
            <div className="relative bg-white w-full h-[725px]">
              <div className="m-10">
                <span className="font-semibold text-3xl">
                  Your Name is Cool
                </span>
                <div className="mt-1 mb-6">
                  <span className="text-sm text-slate-500">Hello World</span>
                </div>
              </div>
              <div className="border-t absolute bg-white inset-x-0 bottom-0 h-16"></div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-zinc-50">{children}</div>
    </>
  )
}

export default HomeLayout
