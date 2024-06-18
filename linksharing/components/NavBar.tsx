'use client'

import Link from 'next/link'
import { Navbar, Button } from 'flowbite-react'
import { customThemeButton, customThemeNavbar } from '../utils/helperTheme'
export function NavbarComponent() {
  return (
    <Navbar theme={customThemeNavbar} fluid rounded>
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        <img
          src="../images/devlinks.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Devlink Logo"
        />
      </Navbar.Brand>
      <Button theme={customThemeButton} color="white">
        <span>Links</span>
      </Button>
      <Button theme={customThemeButton} color="white">
        <span> Profile Details</span>
      </Button>
      <Navbar.Collapse>
        <Navbar.Link as={Link} href="#">
          About
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
