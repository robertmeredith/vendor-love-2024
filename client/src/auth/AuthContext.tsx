import { createContext, useContext, useEffect, useState } from 'react'

import {
  setStoredLoggedInData,
  getStoredLoggedInData,
  clearStoredLoggedInData,
} from './local-storage'

import { LoggedInData } from '@/typings/user.types'
import { setAuthToken } from '@/api/customAxios'

type AuthContextValue = {
  userId: number | null
  userToken: string | null
  setLoggedInData: (loggedInData: LoggedInData) => void
  clearLoggedInData: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useLoggedInData = (): AuthContextValue => {
  const authValue = useContext(AuthContext)
  if (!authValue) {
    throw new Error(
      'Error! AuthContext called from outside the AuthContextProvider'
    )
  }

  return authValue
}

// Auth Context Provider
export const AuthContextProvider = ({
  children,
}: React.PropsWithChildren<object>) => {
  // get userId and userToken from local storage
  const [loggedInData, setLoggedInDataRaw] = useState<LoggedInData | null>(
    getStoredLoggedInData()
  )

  // // set the auth token for axios
  useEffect(() => {
    setAuthToken(loggedInData?.userToken ?? null)
  }, [loggedInData])

  // can't destructure since loggedinData might be null
  const userId = loggedInData?.userId ?? null
  const userToken = loggedInData?.userToken ?? null

  // Exported function to update state and local storage
  const setLoggedInData = ({ userId, userToken }: LoggedInData) => {
    setLoggedInDataRaw({ userId, userToken })
    setStoredLoggedInData({ userId, userToken })
  }

  // Exported  function to clear state and local storage
  const clearLoggedInData = () => {
    setLoggedInDataRaw(null)
    clearStoredLoggedInData()
  }

  // return the AuthContext.Provider
  return (
    <AuthContext.Provider
      // pass the state and functions to the context
      value={{ userId, userToken, clearLoggedInData, setLoggedInData }}
    >
      {children}
    </AuthContext.Provider>
  )
}
