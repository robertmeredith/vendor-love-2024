import { UseQueryResult } from '@tanstack/react-query'

import { AxiosError } from 'axios'

import { UserAccount } from '@/typings/user.types'

import userService from '@/api/userService'

import { useLoggedInData } from '@/auth/AuthContext'
import { useQueryClient, useQuery } from '@tanstack/react-query'


// Type for the useGetUser hook to include clearUser function
type UseUserQuery = UseQueryResult<UserAccount, AxiosError> & {
  clearUser: () => void
}

const useGetUser = (): UseUserQuery => {
  const { userToken } = useLoggedInData()

  const queryClient = useQueryClient()


  const query = useQuery<UserAccount, AxiosError>({
    queryKey: ['user'],
    queryFn: () => userService.getUser(userToken),
    enabled: !!userToken,
    staleTime: 1000 * 60 * 5, // 10 minutes
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  // meant to be called from useAuth
  function clearUser() {
    queryClient.removeQueries({
      queryKey: ['user'],
    })
  }

  return { ...query, clearUser }
}

export { useGetUser }
