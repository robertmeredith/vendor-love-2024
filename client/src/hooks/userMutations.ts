import { useMutation, UseMutationResult } from '@tanstack/react-query'
import userService from '@/api/userService'
import { toast } from '@/components/ui/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { UserAccount } from '@/typings/user.types'
import { AxiosError } from 'axios'

// UPDATE USER NAME
export const useUpdateUserName = (): UseMutationResult<
  UserAccount,
  AxiosError,
  { firstName: string; lastName: string }
> => {
  // Initialise queryClient to clear queries on success
  const queryClient = useQueryClient()

  const updateUserNameMutation = useMutation<
    UserAccount,
    AxiosError,
    { firstName: string; lastName: string }
  >({
    mutationFn: (data: { firstName: string; lastName: string }) =>
      userService.updateUserName(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast({
        title: 'Success!',
        description: 'User name updated',
      })
    },
  })

  return updateUserNameMutation
}

export const useUpdateUserEmail = (): UseMutationResult<
  UserAccount,
  AxiosError,
  string
> => {
  // Initialise queryClient to clear queries on success
  const queryClient = useQueryClient()

  const updateEmailMutation = useMutation<UserAccount, AxiosError, string>({
    mutationFn: (newEmail: string) => userService.updateUserEmail(newEmail),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast({
        title: 'Success!',
        description: 'User email updated',
      })
    },
    onError: (error) => {
      console.log('ERROR - UPDATE USER EMAIL ', error)
      toast({
        title: 'Error!',
        description: 'Failed to update user email',
      })
    },
  })

  return updateEmailMutation
}

export const useUpdateUserPassword = () => {
  // Initialise queryClient to clear queries on success
  const queryClient = useQueryClient()

  const updatePasswordMutation = useMutation<
    { msg: string },
    AxiosError,
    string
  >({
    mutationFn: (newPassword: string) =>
      userService.updateUserPassword(newPassword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast({
        title: 'Success!',
        description: 'User password updated',
      })
    },
    onError: (error) => {
      console.log('ERROR - UPDATE USER PASSWORD ', error)
      toast({
        title: 'Error!',
        description: 'Failed to update user password',
      })
    },
  })

  return updatePasswordMutation
}
