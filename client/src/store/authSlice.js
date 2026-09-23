import { createSlice } from '@reduxjs/toolkit'

const storedUser = localStorage.getItem('user')
const storedToken = localStorage.getItem('token')

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    isAuthenticated: !!storedToken,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => { state.loading = true; state.error = null },
    loginSuccess: (state, action) => {
      state.loading = false
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    clearError: (state) => { state.error = null },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions
export default authSlice.reducer
