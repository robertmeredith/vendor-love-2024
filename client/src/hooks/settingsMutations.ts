import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import { type SettingsFormData } from '@/typings/settings.types'
import { toast } from '@/components/ui/use-toast'
import userService from '@/api/userService'
import { AxiosError } from 'axios'

export const useUpdateSettings = (): UseMutationResult<
  SettingsFormData,
  AxiosError,
  SettingsFormData
> => {
  // Initialise queryClient to clear queries on success
  const queryClient = useQueryClient()

  const updateSettingsMutation = useMutation<
    SettingsFormData,
    AxiosError,
    SettingsFormData
  >({
    mutationFn: (formData: SettingsFormData) =>
      userService.updateUserSettings(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      toast({
        title: 'Success!',
        description: 'Settings updated',
      })
    },
    onError: (error) => {
      console.log('ERROR - UPDATE SETTINGS ', error)
      toast({
        title: 'Error!',
        description: 'Failed to update settings',
      })
    },
  })

  return updateSettingsMutation
}
