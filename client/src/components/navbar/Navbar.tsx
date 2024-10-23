import { type NavItem } from './types'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import UserMenu from './UserMenu'

const navItems: NavItem[] = [
  { label: 'Events', path: '/dashboard/events' },
  { label: 'Vendors', path: '/dashboard/vendors' },
  { label: 'Form', path: '/dashboard/form' },
  { label: 'Settings', path: '/dashboard/settings' },
]

function Navbar() {
  return (
    <header className="sticky top-0 border-b bg-orange-50 z-10">
      <div className="container flex h-16 items-center gap-4">
        {/* DESKTOP NAV */}
        <DesktopNav navItems={navItems} />
        {/* MOBILE NAV */}
        <MobileNav navItems={navItems} />
        {/* USER ICON AND DROPDOWN */}
        <UserMenu />
      </div>
    </header>
  )
}
export default Navbar
