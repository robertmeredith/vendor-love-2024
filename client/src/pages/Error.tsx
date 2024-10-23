import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'
import { Button } from '@nextui-org/react'

function Error() {
  const error = useRouteError()
  console.log('ERROR ', error)
  console.log('Current environment:', process.env.NODE_ENV)

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <p className="text-9xl font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg leading-7">
            Sorry, we couldn't find the page you are looking for
          </p>
          <div className="mt-10">
            <Button size="lg" variant="solid" color="primary">
              <Link to="/dashboard">Go back home</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <h4 className="text-center font-bold text-4xl">there was an error...</h4>
    </main>
  )
}
export default Error
