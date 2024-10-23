import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

function Header() {
  return (
    <header>
      <div className="align-element flex justify-center sm:justify-end py-2 ">
        <div className="flex gap-x-6 justify-center items-center -mr-4">
          <Button asChild variant="link" size="sm">
            <Link to="/login">Sign in / Guest</Link>
          </Button>
          <Button asChild variant="link" size="sm">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
export default Header
