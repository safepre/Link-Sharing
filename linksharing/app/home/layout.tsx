'use client'
import { NavbarComponent } from '@/components/NavBar'
import { platforms } from '@/utils/platforms'
import LinkSection from '@/components/LinkSection'
import { useState } from 'react'
import ProfileSection from '@/components/ProfileSection'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import Section from '@/components/Section'
import ProfileDisplay from '@/components/ProfileDisplay'
import DropdownDisplay from '@/components/DropdownDisplay'

const HomeLayout = ({ children }) => {
  const [selectedButton, setSelectedButton] = useState('links')
  const [LinkItems, setLinkItems] = useState([])

  const addLinkItem = () => {
    setLinkItems(prevItems => [...prevItems, { id: uuidv4(), platform: null }])
  }
  const updateLinkItem = (id, updatedData) => {
    setLinkItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, ...updatedData } : item
      )
    )
  }
  const removeLinkItem = id => {
    setLinkItems(prevItems => prevItems.filter(item => item.id !== id))
  }

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
              <DropdownDisplay LinkItems={LinkItems} platforms={platforms} />
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
                <LinkSection
                  LinkItem={LinkItems}
                  addLinkItem={addLinkItem}
                  removeItem={removeLinkItem}
                  updateLinkItem={updateLinkItem}
                  platforms={platforms}
                />
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
