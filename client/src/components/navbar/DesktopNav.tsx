import { MessageCircleHeart } from 'lucide-react'
import { NavItem } from './types'
import { Link } from 'react-router-dom'


type DesktopNavProps = {
  navItems: NavItem[]
}

function DesktopNav({ navItems }: DesktopNavProps) {
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        to="/dashboard"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <MessageCircleHeart className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      {navItems.map((item) => {
        return (
          <Link
            key={item.label}
            to={item.path}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
export default DesktopNav
