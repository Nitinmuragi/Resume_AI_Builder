import axios from 'axios'

// Read live backend API URL from VITE_API_URL, defaulting to local dev URL
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const axiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token on every request
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// On 401, clear auth and redirect to login
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
