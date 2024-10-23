import { Outlet, useNavigation } from 'react-router-dom'
import { Footer, LandingNav, Loading } from '@/components'

function HomeLayout() {
  const navigation = useNavigation()
  const isPageLoading = navigation.state === 'loading'

  // console.log(navigation)

  return (
    <div className="flex flex-col min-h-screen">
      <LandingNav />
      <main className="container py-14 flex flex-col flex-grow">
        {isPageLoading ? <Loading /> : <Outlet />}
      </main>
      <Footer />
    </div>
  )
}
export default HomeLayout
  