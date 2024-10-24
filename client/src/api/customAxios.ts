import axios from 'axios'

// const apiUrl = '/api/v1'

// Deployment to Render - In production, use the full URL of backend
const apiUrl = import.meta.env.PROD
  ? `${process.env.VITE_API_URL}/api/v1`
  : '/api/v1'

// ? 'https://vendor-love-2024.onrender.com/api/v1'

// Create a custom axios instance
export const customAxios = axios.create({
  baseURL: apiUrl,
  // Added next line for deployment to Render
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor for debugging
customAxios.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
);

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
