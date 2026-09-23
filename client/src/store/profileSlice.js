import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as profileApi from '../api/profileApi'

export const fetchProfile = createAsyncThunk('profile/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await profileApi.getProfile()
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to fetch profile')
  }
})

const profileSlice = createSlice({
  name: 'profile',
  initialState: { profile: null, loading: false, error: null },
  reducers: {
    clearProfile: (state) => { state.profile = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchProfile.fulfilled, (state, action) => { state.loading = false; state.profile = action.payload })
      .addCase(fetchProfile.rejected, (state, action) => { state.loading = false; state.error = action.payload })
  },
})

export const { clearProfile } = profileSlice.actions
export default profileSlice.reducer
