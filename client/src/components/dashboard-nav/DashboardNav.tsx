import { type NavItem } from './types'
import { useState } from 'react'
import useAuth from '@/hooks/useAuth'

const desktopNavItems: NavItem[] = [
  { label: 'Events', path: '/dashboard/events' },
  { label: 'Vendors', path: '/dashboard/vendors' },
  { label: 'Form', path: '/dashboard/events/new' },
]

const mobileNavItems: NavItem[] = [
  { label: 'Events', path: '/dashboard/events' },
  { label: 'Vendors', path: '/dashboard/vendors' },
  { label: 'Form', path: '/dashboard/events/new' },
  { label: 'Settings', path: '/dashboard/settings' },
]

import { MessageCircleHeart } from 'lucide-react'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Spinner,
} from '@nextui-org/react'

// Link import from React Router
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useGetUser } from '@/hooks/userQueries'
import { useIsFetching } from '@tanstack/react-query'

export default function Nav() {
  // State to handle hamburger menu
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  console.log('IS MENU OPEN', isMenuOpen)

  // Logout
  const { logout } = useAuth()

  // User check to determine if user valid
  const { data: user, isError } = useGetUser()

  console.log('USER ', user)

  // Navigation
  const navigate = useNavigate()

  // Log out if user authentication fails
  if (isError) {
    logout()
  }

  const location = useLocation()
  const currentPath = location.pathname

  console.log('CURRENT PATH', currentPath)

  // get fetching state to display spinner
  const isFetching = useIsFetching()

  return (
    <Navbar
      maxWidth="2xl"
      isBordered
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* LOGO */}
      <NavbarContent>
        <NavbarBrand>
          <NavLink to="/dashboard" className="flex items-center gap-2">
            <p className="font-bold text-inherit">Vendor Love</p>
            <MessageCircleHeart />
          </NavLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* Nav Items */}
        {desktopNavItems.map((item) => (
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

      {/* AVATAR & DROPDOWN */}
      <NavbarContent as="div" justify="end">
        {isFetching ? <Spinner size="sm" className="mr-2" /> : null}
        <Dropdown placement="left">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="hidden sm:flex transition-transform"
              color="default"
              // name="Jason Hughes"
              size="sm"
              // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              key="profile"
              className="h-8 gap-2"
              textValue={user?.email || 'User Profile'}
            >
              {/* <p className="font-semibold">Signed in as</p> */}
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>

            <DropdownItem
              key="settings"
              textValue="My Settings"
              onPress={() => navigate('/dashboard/settings')}
            >
              My Settings
            </DropdownItem>

            <DropdownItem
              key="logout"
              color="danger"
              onClick={() => logout()}
              textValue="Log Out"
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* Hamburger */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
      </NavbarContent>
      <NavbarMenu>
        {mobileNavItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              color={
                index === 2
                  ? 'primary'
                  : index === mobileNavItems.length - 1
                  ? 'danger'
                  : 'foreground'
              }
              className={`w-full ${
                currentPath === item.path ? 'text-purple-900 font-bold' : ''
              }`}
              to={item.path}
            >
              {item.label}
            </NavLink>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <button onClick={() => logout()}>Log Out</button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}
