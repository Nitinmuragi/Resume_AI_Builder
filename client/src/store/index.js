import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import profileReducer from './profileSlice'
import resumeReducer from './resumeSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    resume: resumeReducer,
  },
})

export default store
