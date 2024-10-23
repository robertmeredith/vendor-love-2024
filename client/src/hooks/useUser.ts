// import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
// import authService from '@/api/authService'
// import { useLoggedInData } from '@/auth/AuthContext'
// import { UserAccount } from '@/typings/user.types'
// import { AxiosError } from 'axios'

// export default function useUser(): UseQueryResult<UserAccount, AxiosError> {
//   // query client
//   const queryClient = useQueryClient()

//   // user credentials in local storage = userId + userToken
//   const { userToken } = useLoggedInData()

//   // query to verify user
//   const {
//     data: user,
//     isPending,
//     isError,
//     error,
//   } = useQuery<UserAccount, AxiosError>({
//     queryKey: ['user'],
//     queryFn: () => authService.verifyUser(userToken),
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//     retry: false,
//     staleTime: 1000 * 60 * 10, // 10 minutes
//     enabled: !!userToken,
//   })

//   // meant to be called from useAuth
//   function clearUser() {
//     queryClient.removeQueries({
//       queryKey: ['user'],
//     })
//   }
//   return { user, isPending, isError, error, clearUser }
// }
