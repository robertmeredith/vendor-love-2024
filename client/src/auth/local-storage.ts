const USER_LOCAL_STORAGE_KEY = 'vendor-app-user'

import { LoggedInData } from '@/typings/user.types'

// helper to save user to localstorage
export function setStoredLoggedInData(user: LoggedInData): void {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user))
}

// helper to get user from localstorage
export function getStoredLoggedInData(): LoggedInData | null {
  const storedUser = localStorage.getItem(USER_LOCAL_STORAGE_KEY)
  return storedUser ? JSON.parse(storedUser) : null
}

export function clearStoredLoggedInData(): void {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
}

export default {
  setStoredLoggedInData,
  getStoredLoggedInData,  
  clearStoredLoggedInData,
}
