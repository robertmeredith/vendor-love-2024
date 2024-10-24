import authService from '@/api/authService'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useGetUser } from './userQueries'
import { useLoggedInData } from '@/auth/AuthContext'
import { LoggedInData } from '@/typings/user.types'
import { queryClient } from '@/api/queryClient'

interface ApiError {
  msg: string
}

// AUTH HOOK - returns mutation functions for login, register, and logout
export default function useAuth() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { clearUser } = useGetUser()
  const { clearLoggedInData, setLoggedInData } = useLoggedInData()

  // LOGIN USER MUTATION
  const { mutate: loginUser, isPending: loginPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: (user) => {
      if (user) {
        // update userId and userToken in state and local storage
        setLoggedInData(user)
        navigate('/dashboard')
        toast({ description: 'Success! Logged in' })
      }
    },
    onError: (error: AxiosError<ApiError>) => {
      clearLoggedInData()
      toast({
        title: 'Login Error',
        description: error.response?.data?.msg || 'Login failed',
      })
    },
    retry: 0,
  })

  // REGISTER USER MUTATION
  const { mutate: registerUser } = useMutation({
    mutationFn: authService.register,
    onSuccess: (user: LoggedInData) => {
      if (user) {
        // update userId and userToken in state and local storage
        setLoggedInData(user)
        navigate('/dashboard/settings')
        toast({ description: 'Registration successful!' })
      }
    },
    onError: (error: AxiosError<ApiError>) => {
      clearLoggedInData()
      clearUser()
      console.error(error)
      toast({
        title: 'Registration Error',
        description: error.response?.data?.msg || 'Registration failed',
      })
    },
    retry: 0,
  })

  // LOGOUT
  const logout = useCallback(() => {
    // remove user from local storage and query cache using useUser
    clearLoggedInData()
    clearUser()
    navigate('/')
    toast({ description: 'Success! Logged out' })
    // clear all query cache
    queryClient.clear()
  }, [clearLoggedInData, clearUser, navigate, toast])

  return { loginUser, registerUser, logout, loginPending }
}
