import { QueryCache, QueryClient } from '@tanstack/react-query'
import localStorage from '@/auth/local-storage'
import { toast } from '@/components/ui/use-toast'
import { AxiosError } from 'axios'

// function errorHandler(errorMsg: string) {
//   // https://chakra-ui.com/docs/components/toast#preventing-duplicate-toast
//   // one message per page load, not one message per query
//   // the user doesn't care that there were three failed queries on the staff page
//   //    (staff, treatments, user)
//   const id = 'react-query-toast'

//   if (!toast.isActive(id)) {
//     const action = 'fetch'
//     const title = `could not ${action} data: ${
//       errorMsg ?? 'error connecting to server'
//     }`
//     toast({ id, title, status: 'error', variant: 'subtle', isClosable: true })
//   }
// }

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // conservative values
      // staleTime: 1000 * 60 * 10, // 10 mins
      // gcTime: 1000 * 60 * 15, // 15 mins
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          // TODO: toast not persistent
          // clear user data
          localStorage.clearStoredLoggedInData()
          // redirect to login page
          window.location.href = '/login'
          toast({
            title: 'Session expired',
            description: 'Please log in again',
          })
        }
      }
    },
  }),
})
