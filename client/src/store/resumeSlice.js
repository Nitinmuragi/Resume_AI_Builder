import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as resumeApi from '../api/resumeApi'
import * as templateApi from '../api/templateApi'

export const fetchResumes = createAsyncThunk('resume/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await resumeApi.listResumes()
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to fetch resumes')
  }
})

export const fetchTemplates = createAsyncThunk('resume/fetchTemplates', async (_, { rejectWithValue }) => {
  try {
    const res = await templateApi.listTemplates()
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to fetch templates')
  }
})

export const fetchResumeById = createAsyncThunk('resume/fetchById', async (id, { rejectWithValue }) => {
  try {
    const res = await resumeApi.getResume(id)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to fetch resume')
  }
})

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    resumes: [],
    currentResume: null,
    templates: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentResume: (state, action) => { state.currentResume = action.payload },
    clearCurrentResume: (state) => { state.currentResume = null },
    removeResume: (state, action) => {
      state.resumes = state.resumes.filter(r => r.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResumes.pending, (state) => { state.loading = true })
      .addCase(fetchResumes.fulfilled, (state, action) => { state.loading = false; state.resumes = action.payload })
      .addCase(fetchResumes.rejected, (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(fetchTemplates.fulfilled, (state, action) => { state.templates = action.payload })
      .addCase(fetchResumeById.pending, (state) => { state.loading = true })
      .addCase(fetchResumeById.fulfilled, (state, action) => { state.loading = false; state.currentResume = action.payload })
      .addCase(fetchResumeById.rejected, (state, action) => { state.loading = false; state.error = action.payload })
  },
})

export const { setCurrentResume, clearCurrentResume, removeResume } = resumeSlice.actions
export default resumeSlice.reducer
