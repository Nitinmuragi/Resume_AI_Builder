import api from './axiosInstance'

export const listTemplates = (category) => api.get(`/templates${category ? `?category=${category}` : ''}`)
export const getTemplate = (id) => api.get(`/templates/${id}`)
