import { NextUIProvider } from '@nextui-org/react'
import { Outlet, useNavigate } from 'react-router-dom'


function RootLayout() {
  const navigate = useNavigate()
  return (
    <NextUIProvider navigate={navigate}>
      <Outlet />
    </NextUIProvider>
  )
}

export default RootLayout
