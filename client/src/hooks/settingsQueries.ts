import userService from '@/api/userService'
import { useLoggedInData } from '@/auth/AuthContext'
import { SettingsFormData } from '@/typings/settings.types'
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'



// GET - get user settings
export const useGetUserSettings = (): UseQueryResult<SettingsFormData, AxiosError> => {
  const { userToken } = useLoggedInData()

  const query = useQuery<SettingsFormData, AxiosError>({
    queryKey: ['settings'],
    queryFn: () => userService.getUserSettings(),
    enabled: !!userToken,
    staleTime: 1000 * 60 * 10,
  })

  return query
}

export const useUpdateUserSettings = (): UseMutationResult<SettingsFormData, AxiosError, SettingsFormData> => {

  const mutation = useMutation<SettingsFormData, AxiosError, SettingsFormData>({
    mutationFn: (settings: SettingsFormData) =>
      userService.updateUserSettings(settings),
  })

  return mutation
}
