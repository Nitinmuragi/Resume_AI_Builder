import api from './axiosInstance'

export const listResumes = () => api.get('/resumes')
export const createResume = (data) => api.post('/resumes', data)
export const getResume = (id) => api.get(`/resumes/${id}`)
export const updateResume = (id, data) => api.put(`/resumes/${id}`, data)
export const deleteResume = (id) => api.delete(`/resumes/${id}`)
export const duplicateResume = (id) => api.post(`/resumes/${id}/duplicate`)
export const exportPDF = (id) => api.get(`/resumes/${id}/export-pdf`, { responseType: 'blob' })
