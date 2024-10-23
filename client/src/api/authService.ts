const API_URL_AUTH = '/auth'
import { LoginFormData, RegistrationFormData } from '@/utils/zod.validation'
import { LoggedInData} from '@/typings/user.types'
import { customAxios} from './customAxios'

// TODO: Delete this, not used
// Same function in userService
// VERIFY USER
// const verifyUser = async (userToken: string) => {
  
//   const { data } = await customAxios.get<UserAccount>(API_URL_AUTH, {
//     headers: getJWTAuthHeader(userToken),
//   })

//   console.log('DATA IN VERIFY USER', data)
//   return data
// }

// REGISTER USER
const register = async (
  formData: RegistrationFormData
): Promise<LoggedInData> => {
  const { data } = await customAxios.post<LoggedInData>(
    `${API_URL_AUTH}/register`,
    formData
  )

  return data
}

// LOGIN USER
const login = async (formData: LoginFormData): Promise<LoggedInData> => {
  const { data } = await customAxios.post<LoggedInData>(
    `${API_URL_AUTH}/login`,
    formData
  )
  return data
}

export default {
  register,
  login,
}
