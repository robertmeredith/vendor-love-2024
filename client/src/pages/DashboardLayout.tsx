import { Outlet, useNavigation } from 'react-router-dom'
import { Loading, Footer, DashboardNav } from '@/components'

function DashboardLayout() {
  const navigation = useNavigation()

  const isPageLoading = navigation.state === 'loading'

  return (
    <div className="flex flex-col gap-14 min-h-screen">
      <DashboardNav />

      <main className="container flex-grow">
        {/* TODO: Add Loading Spinner */}
        {isPageLoading ? <Loading /> : <Outlet />}
      </main>

      <Footer />
    </div>
  )
}
export default DashboardLayout
