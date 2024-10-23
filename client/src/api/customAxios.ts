import axios from 'axios'

const apiUrl = '/api/v1'

// Create a custom axios instance
export const customAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getJWTAuthHeader = (userToken: string) => {
  return { Authorization: `Bearer ${userToken}` }
}

export const setAuthToken = (token: string | null) => {
  if (token) {
    customAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete customAxios.defaults.headers.common['Authorization']
  }
}
