'use client'
import { NavbarComponent } from '@/components/NavBar'
import LinkSection from '@/components/LinkSection'
import { useState } from 'react'
import ProfileSection from '@/components/ProfileSection'
import React from 'react'
import Section from '@/components/Section'
import ProfileDisplay from '@/components/ProfileDisplay'

const HomeLayout = ({ children }) => {
  const [selectedButton, setSelectedButton] = useState('links')

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
            <div className="flex flex-col items-center space-y-4 ">
              <ProfileDisplay />
              {children}
            </div>
          </div>
          <Section
            title={
              selectedButton === 'links'
                ? 'Customize your links'
                : 'Profile Details'
            }
            description={
              selectedButton === 'links'
                ? 'Add/edit/remove links below and then share all your profiles with the world!'
                : 'Add your details to create a personal touch to your profile.'
            }>
            {selectedButton === 'links' ? (
              <>
                <LinkSection />
              </>
            ) : (
              <>
                <ProfileSection />
              </>
            )}
          </Section>
        </div>
      </div>
      <div className="bg-zinc-50"> s</div>
    </>
  )
}
export default HomeLayout
