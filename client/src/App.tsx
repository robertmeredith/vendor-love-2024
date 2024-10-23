import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  DashboardLayout,
  HomeLayout,
  Landing,
  Login,
  Register,
  Summary,
  Vendors,
  Events,
  SingleEvent,
  UserSettings,
  EventForm,
  SelectTest,
  SingleVendor,
  ProtectedRoute,
  TestPage,
  CreateVendor,
} from './pages'
import Error from './pages/Error'
import { ErrorElement } from './components'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvider } from './auth/AuthContext'
import { Toaster } from './components/ui/toaster'
import { queryClient } from './api/queryClient'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: '/select',
        element: <SelectTest />,
      },
      // TODO: remove this
      {
        path: 'test',
        element: <TestPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    // add DashboardLayout inside ProtectedRoute
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Summary />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'events',
        element: <Events />,
      },
      {
        path: 'events/:eventId',
        element: <SingleEvent />,
      },
      {
        path: 'vendors',
        element: <Vendors />,
      },
      {
        path: 'vendors/new',
        element: <CreateVendor />,
      },
      {
        path: 'vendors/:vendorId',
        element: <SingleVendor />,
      },
      {
        path: 'events/new',
        element: <EventForm />,
      },
      {
        path: 'settings',
        element: <UserSettings />,
      },
    ],
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={router.navigate}>
        <main >
          <AuthContextProvider>
            <Toaster />
            <RouterProvider router={router} />
          </AuthContextProvider>
        </main>
      </NextUIProvider>
    </QueryClientProvider>
  )
}

export default App
