'use client'

import Link from 'next/link'
import { Navbar, Button } from 'flowbite-react'
import { customThemeButton, customThemeNavbar } from '../utils/helperTheme'
import Logo from '@/images/devlinks.svg'
import Image from 'next/image'
export function NavbarComponent({ selectedButton, setSelectedButton }) {
  function eventProfileHandler() {
    setSelectedButton('profile')
  }

  function eventHandler() {
    setSelectedButton('links')
  }

  const activeClass = 'bg-purple-200 text-purple-600'

  return (
    <Navbar theme={customThemeNavbar} fluid rounded>
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        <Image src={Logo} className="mr-3 h-6 sm:h-9" alt="Devlink Logo" />
      </Navbar.Brand>
      <Button
        theme={customThemeButton}
        onClick={eventHandler}
        color="white"
        className={selectedButton === 'links' ? activeClass : ''}>
        <span>Links</span>
      </Button>
      <Button
        theme={customThemeButton}
        onClick={eventProfileHandler}
        color="white"
        className={selectedButton === 'profile' ? activeClass : ''}>
        <span> Profile Details</span>
      </Button>
      <Navbar.Collapse>
        <Navbar.Link as={Link} href="/preview">
          Preview
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
