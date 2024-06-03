'use client'

import Link from 'next/link'
import { Navbar } from 'flowbite-react'
import { customThemeNavbar } from '../utils/helperTheme'
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
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="#">
          About
        </Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
