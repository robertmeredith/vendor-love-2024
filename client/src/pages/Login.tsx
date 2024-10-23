import { LoginForm } from '@/components'
import { toast } from '@/components/ui/use-toast'
import { useGetUser } from '@/hooks/userQueries'
import { useNavigate } from 'react-router-dom'

function Login() {
  // TODO: check for logged in user and redirect to dashboard
  // do I just check for userToken in local storage or do I need to make a call?

  const { data: user, isLoading } = useGetUser()
  const navigate = useNavigate()

  console.log(user)

  if (user) {
    navigate('/dashboard')
    toast({
      title: 'Welcome back!',
      description: 'You are now logged in.',
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex-grow">
      <LoginForm />
    </div>
  )
}

export default Login
