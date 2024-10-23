import { MessageCircleHeart, Menu } from 'lucide-react'
import { NavItem } from './types'
import { Link } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

type MobileNavProps = {
  navItems: NavItem[]
}

function MobileNav({ navItems }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        {/* MOBILE NAV */}
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            to="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <MessageCircleHeart className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {navItems.map((item) => {
            return (
              <Link
                key={item.label}
                to={item.path}
                className="text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <MobileNav navItems={navItems} />
      </SheetContent>
    </Sheet>
  )
}
export default MobileNav
