import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Divider, Input } from '@nextui-org/react'
// importController,  react-hook-form
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import {
  useUpdateUserName,
  useUpdateUserEmail,
  useUpdateUserPassword,
} from '@/hooks/userMutations'
import { toast } from '../ui/use-toast'
import { UserAccount } from '@/typings/user.types'

// TODO: move schema to zod file
const AccountFormSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, 'First name is required')
      .max(40, 'Name must be less than 40 characters'),
    lastName: z.string().trim().min(0),
    email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .email('Not a valid email address'),
    password: z
      .string()
      .trim()
      .min(6, 'Password must be at least 6 characters')
      .max(16, 'Password must not be greater than 16 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

type AccountFormData = z.infer<typeof AccountFormSchema>

function AccountPage({ user }: { user: UserAccount }) {
  const { mutate: updateUserName } = useUpdateUserName()
  const { mutate: updateUserEmail } = useUpdateUserEmail()
  const { mutate: updateUserPassword } = useUpdateUserPassword()

  const {
    watch,
    control,
    trigger,
    formState: { errors, dirtyFields },
    reset,
  } = useForm<AccountFormData>({
    defaultValues: user,
    resolver: zodResolver(AccountFormSchema),
  })

  // use watch to get the values of the form
  const formValues = watch()

  // Function to submit name change
  const onSubmitName = async () => {
    const isValid = await trigger(['firstName', 'lastName']) // Validate only name fields

    if (isValid) {
      // Submit name data
      const { firstName, lastName } = formValues
      updateUserName(
        { firstName, lastName },
        {
          onSuccess: () => {
            reset({ firstName, lastName })
          },
          onError: (error) => {
            console.log('Error updating user name:', error)
            toast({
              title: 'Error!',
              description: 'Failed to update user name',
            })
          },
        }
      )
    }
  }

  // Function to submit email change
  const onSubmitEmail = async () => {
    const isValid = await trigger(['email']) // Validate only email field

    if (isValid) {
      // Submit email data
      const { email } = formValues
      updateUserEmail(email, {
        onSuccess: () => {
          reset({ email })
        },
        onError: (error) => {
          console.log('Error updating user email:', error)
          toast({
            title: 'Error!',
            description: 'Failed to update user email',
          })
        },
      })
    }
  }

  // Function to submit password change
  const onSubmitPassword = async () => {
    const isValid = await trigger(['password', 'confirmPassword']) // Validate only password fields
    console.log('Submit Password Valid:', isValid)

    if (isValid) {
      // Submit password data
      const { password } = formValues
      updateUserPassword(password, {
        onSuccess: () => {
          reset({ password: '', confirmPassword: '' })
        },
        onError: (error) => {
          console.log('Error updating user password:', error)
          toast({
            title: 'Error!',
            description: 'Failed to update user password',
          })
        },
      })
    }
  }

  return (
    <form className="flex flex-col gap-8">
      {/* NAME SECTION*/}
      <div className="flex flex-col gap-6">
        <Controller
          control={control}
          name={'firstName'}
          render={({ field }) => (
            <Input
              {...field}
              label="First Name"
              labelPlacement="outside"
              placeholder="Enter your first name"
              size="md"
              isRequired
              isInvalid={!!errors.firstName?.message}
              errorMessage={errors.firstName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name={'lastName'}
          render={({ field }) => (
            <Input
              {...field}
              label="Last Name"
              labelPlacement="outside"
              placeholder="Enter your last name"
              size="md"
            />
          )}
        />
        <Button
          className="w-full md:w-32"
          variant="ghost"
          color="primary"
          onClick={onSubmitName}
          // disable if name is not touched
          isDisabled={!dirtyFields.firstName && !dirtyFields.lastName}
        >
          Save Name
        </Button>
      </div>

      <Divider />

      {/* EMAIL SECTION */}
      <div className="flex flex-col gap-6">
        <Controller
          control={control}
          name={'email'}
          render={({ field }) => (
            <Input
              {...field}
              label="Login Email"
              labelPlacement="outside"
              placeholder="Enter your login email"
              size="md"
              isRequired
              isInvalid={!!errors.email?.message}
              errorMessage={errors.email?.message}
            />
          )}
        />
        <Button
          className="w-full md:w-32"
          variant="ghost"
          color="primary"
          onClick={onSubmitEmail}
          // disable if email is not touched
          isDisabled={!dirtyFields.email}
        >
          Save Email
        </Button>
      </div>

      <Divider />

      {/* PASSWORD SECTION */}
      <div className="flex flex-col gap-6">
        <Controller
          control={control}
          name={'password'}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              label="New Password"
              labelPlacement="outside"
              placeholder="Password"
              size="md"
              isRequired
              isInvalid={!!errors.password?.message}
              errorMessage={errors.password?.message}
            />
          )}
        />
        <Controller
          control={control}
          name={'confirmPassword'}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              label="Confirm Password"
              labelPlacement="outside"
              placeholder="Confirm Password"
              size="md"
              isRequired
              isInvalid={!!errors.confirmPassword?.message}
              errorMessage={errors.confirmPassword?.message}
            />
          )}
        />
        <Button
          className="w-full md:w-32"
          variant="ghost"
          color="primary"
          onClick={onSubmitPassword}
          // disable if password is not touched
          isDisabled={!dirtyFields.password}
        >
          Save Password
        </Button>
      </div>
    </form>
  )
}
export default AccountPage
