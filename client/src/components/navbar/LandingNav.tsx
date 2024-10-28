import { NavLink, useLocation } from 'react-router-dom'
import { type NavItem } from './types'

import { MessageCircleHeart } from 'lucide-react'

const landingNavItems: NavItem[] = [
  { label: 'Login', path: '/login' },
  { label: 'Register', path: '/register' },
]

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,

} from '@nextui-org/react'

function Header() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <Navbar
      maxWidth="2xl"
      isBordered
      shouldHideOnScroll
      // onMenuOpenChange={setIsMenuOpen}
    >
      {/* LOGO */}
      <NavbarContent>
        <NavbarBrand>
          <NavLink to="/" className="flex items-center gap-2">
            <p className="font-bold text-inherit">Vendor Love</p>
            <MessageCircleHeart />
          </NavLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* Nav Items */}
        {landingNavItems.map((item) => (
          <NavbarItem key={item.label}>
            <NavLink
              to={item.path}
              color="foreground"
              className={
                currentPath === item.path ? 'text-secondary-500 font-bold' : ''
              }
            >
              {item.label}
            </NavLink>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  )
}
export default Header
