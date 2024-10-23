import { Button } from '@nextui-org/react'
import { Link } from 'react-router-dom'

import { Input } from '@nextui-org/react'

// Validation and form creation
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'

// Auth Hooks
import useAuth from '@/hooks/useAuth'


// Import Schema
import { registrationSchema } from '@/utils/zod.validation'

//extract the inferred type from schema
import { RegistrationFormData } from '@/utils/zod.validation'

// Import Default categories
import { defaultWeddingCategories } from '@/helpers'
import CategoryAutoComplete from './NextUi/CategoryAutoComplete'

function RegisterForm() {
  const { registerUser } = useAuth()

  // Set up form
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: '',
      password: '',
      category: '',
      name: '',
    },
  })

  // LOG FORM DATA
  const currentFormValues = watch()
  console.log('currentFormData', currentFormValues)

  // On Submit function
  const onSubmit = async (formData: RegistrationFormData) => {
    console.log('registration data', formData)

    registerUser(formData)
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-balance text-muted-foreground">
            Enter your details below to register an account
          </p>
        </div>
        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            {/* E-MAIL */}
            <Controller
              control={control}
              name="name"
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    // placeholder="me@example.com"
                    isInvalid={!!errors.name?.message}
                    errorMessage={errors.name?.message}
                    label="Business Name"
                    size="md"
                  />
                )
              }}
            />

            {/* CATEGORY */}
            <Controller
              control={control}
              name={`category`}
              render={({ field }) => (
                <CategoryAutoComplete
                  {...field}
                  options={defaultWeddingCategories}
                  label="Category"
                  // isInvalid={isSubmitted && !isValid}
                  isInvalid={!!errors.category?.message}
                  errorMessage={errors.category?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    // placeholder="me@example.com"
                    isInvalid={!!errors.email?.message}
                    errorMessage={errors.email?.message}
                    label="Email"
                    size="md"
                  />
                )
              }}
            />
            {/* PASSWORD */}
            <Controller
              control={control}
              name="password"
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    type="password"
                    label="Password"
                    size="md"
                    isInvalid={!!errors.password?.message}
                    errorMessage={errors.password?.message}
                  />
                )
              }}
            />
            <Button
              type="submit"
              className="w-full mt-4 bg-gray-800 text-white"
            >
              {isSubmitting ? 'Loading...' : 'Sign up'}
            </Button>
            {/* TODO: ADD GOOGLE LOGIN */}
            {/* <Button variant="light" className="w-full">
                Login with Google
              </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Already registered?{' '}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
