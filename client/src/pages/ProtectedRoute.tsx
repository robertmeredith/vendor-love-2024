import { useLoggedInData } from '@/auth/AuthContext'
import { Navigate } from 'react-router-dom'

type Props = {
  children: React.ReactNode
}

function ProtectedRoute({ children }: Props) {
  const { userToken } = useLoggedInData()

  if (!userToken) {
    return <Navigate to="/login" />
  }

  return children
}
export default ProtectedRoute
