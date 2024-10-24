import { Button } from '@nextui-org/react'
import { Form } from '@/components/ui/form'

import { Input } from '@nextui-org/react'

// Validation and form creation
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { Link } from 'react-router-dom'

// Auth Hooks
import useAuth from '@/hooks/useAuth'

// Toast
import { useToast } from '@/components/ui/use-toast'

// Schema Import
import { loginSchema } from '@/utils/zod.validation'

//extract the inferred type from schema
type LoginSchemaType = z.infer<typeof loginSchema>

function LoginForm() {
  const { loginUser, loginPending } = useAuth()
  const { toast } = useToast()

  // Set up form
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'robert@gmail.com',
      password: 'password',
    },
  })

  // Destructure form
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = form

  // On Submit function
  const onSubmit = async (data: LoginSchemaType) => {
    try {
      await loginUser(data)
    } catch (error) {
      toast({
        description: 'Login failed. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        {/* FORM */}
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              {/* E-MAIL */}
              <Controller
                control={control}
                name="email"
                render={({ field: { ref, ...field } }) => {
                  return (
                    <Input
                      {...field}
                      // placeholder="me@example.com"
                      isInvalid={isSubmitted && !isValid}
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
                render={({ field: { ref, ...field } }) => {
                  return (
                    <Input
                      {...field}
                      type="password"
                      label="Password"
                      size="md"
                      isInvalid={isSubmitted && !isValid}
                      errorMessage={errors.password?.message}
                    />
                  )
                }}
              />
              <Button
                type="submit"
                className="w-full mt-4 bg-gray-800 text-white"
                isLoading={loginPending}
                isDisabled={loginPending}
              >
                {loginPending ? 'Logging in...' : 'Login'}
              </Button>
              <Button variant="light" className="w-full" isDisabled>
                Login with Google... coming soon
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default LoginForm
