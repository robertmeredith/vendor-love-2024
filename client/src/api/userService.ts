import axios, { AxiosError } from 'axios'
import { customAxios, getJWTAuthHeader } from './customAxios'
import { SettingsFormData } from '@/typings/settings.types'
import { UserAccount } from '@/typings/user.types'
import { Vendor } from '@/typings/vendor.types'
const API_URL_USER = '/user'

// PUBLIC - Get User Vendors - used for fetching vendors for client form
const getClientFormVendors = async (userId: string): Promise<Vendor[]> => {
  const { data } = await axios.get<Vendor[]>(
    `${API_URL_USER}/${userId}/vendors`
  )
  return data
}

// PRIVATE - Get User - used for getting user account details in settings
// accepts userToken directly - setting on the custom axios instance happens too slowly after refreshing the page and causes the user to be logged out
const getUser = async (userToken: string | null): Promise<UserAccount> => {
  console.log('userToken', userToken)


  if (!userToken) {
    throw new AxiosError('No user token provided')
  }
  const { data } = await customAxios.get<UserAccount>(`${API_URL_USER}`, {
    headers: getJWTAuthHeader(userToken),
  })
  return data
}

// PRIVATE Get User Settings - used for populating form with user settings
const getUserSettings = async (): Promise<SettingsFormData> => {
  const { data } = await customAxios.get<SettingsFormData>(
    `${API_URL_USER}/settings`
  )
  return data
}

// Update User Settings
const updateUserSettings = async (
  settings: SettingsFormData
): Promise<SettingsFormData> => {
  const { data } = await customAxios.put<SettingsFormData>(
    `${API_URL_USER}/settings`,
    settings
  )
  return data
}

// Ppdate User Name - used for updating first and last name
const updateUserName = async ({
  firstName,
  lastName,
}: {
  firstName: string
  lastName: string
}): Promise<UserAccount> => {
  const { data } = await customAxios.patch<UserAccount>(
    `${API_URL_USER}/name`,
    {
      firstName,
      lastName,
    }
  )
  return data
}

// update User Email
const updateUserEmail = async (email: string): Promise<UserAccount> => {
  const { data } = await customAxios.patch<UserAccount>(
    `${API_URL_USER}/email`,
    { email }
  )
  return data
}

// update User Password
const updateUserPassword = async (
  password: string
): Promise<{ msg: string }> => {
  const { data } = await customAxios.patch<{ msg: string }>(
    `${API_URL_USER}/password`,
    { password }
  )
  return data
}

export default {
  getUser,
  getClientFormVendors,
  getUserSettings,
  updateUserSettings,
  updateUserName,
  updateUserEmail,
  updateUserPassword,
}
