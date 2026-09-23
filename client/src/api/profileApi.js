import api from './axiosInstance'

export const getProfile = () => api.get('/profile')
export const updateProfile = (data) => api.put('/profile', data)
export const uploadPhoto = (formData) => api.post('/profile/photo', formData, { headers: { 'Content-Type': 'multipart/form-data' } })

export const getSkillsMaster = (q) => api.get(`/profile/skills/master${q ? `?q=${q}` : ''}`)
export const addSkill = (data) => api.post('/profile/skills', data)
export const deleteSkill = (id) => api.delete(`/profile/skills/${id}`)

export const getLanguagesMaster = () => api.get('/profile/languages/master')
export const addLanguage = (data) => api.post('/profile/languages', data)
export const deleteLanguage = (id) => api.delete(`/profile/languages/${id}`)

export const addEducation = (data) => api.post('/profile/education', data)
export const updateEducation = (id, data) => api.put(`/profile/education/${id}`, data)
export const deleteEducation = (id) => api.delete(`/profile/education/${id}`)

export const addExperience = (data) => api.post('/profile/experience', data)
export const updateExperience = (id, data) => api.put(`/profile/experience/${id}`, data)
export const deleteExperience = (id) => api.delete(`/profile/experience/${id}`)

export const addProject = (data) => api.post('/profile/projects', data)
export const updateProject = (id, data) => api.put(`/profile/projects/${id}`, data)
export const deleteProject = (id) => api.delete(`/profile/projects/${id}`)

export const addCertification = (data) => api.post('/profile/certifications', data)
export const deleteCertification = (id) => api.delete(`/profile/certifications/${id}`)
