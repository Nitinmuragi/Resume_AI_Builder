import api from './axiosInstance'

export const runAtsCheck = (data) => api.post('/ats/check', data)
export const getAtsHistory = (resumeId) => api.get(`/ats/history/${resumeId}`)
