import axios from 'axios'

// 1. Resolve raw URL from Vite environment variable (VITE_API_URL)
let rawBaseURL = import.meta.env.VITE_API_URL

// 2. Fallback handling:
//    - In development mode (npm run dev): default to localhost:5000/api
//    - In production (Netlify): warn if VITE_API_URL is missing
if (!rawBaseURL) {
  if (import.meta.env.DEV) {
    rawBaseURL = 'http://localhost:5000/api'
  } else {
    console.error(
      '[ResumeBuilder] VITE_API_URL is not set in Netlify environment variables! ' +
      'Please add VITE_API_URL in Netlify: Site configuration -> Environment variables.'
    )
    rawBaseURL = '/api'
  }
}

// 3. Normalize baseURL: trim whitespace and remove trailing slashes
let cleanBaseURL = (rawBaseURL || '').trim().replace(/\/+$/, '')

// 4. Ensure it ends with /api (handles both https://app.onrender.com and https://app.onrender.com/api)
if (cleanBaseURL && !cleanBaseURL.endsWith('/api')) {
  cleanBaseURL = `${cleanBaseURL}/api`
}

const axiosInstance = axios.create({
  baseURL: cleanBaseURL,
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
