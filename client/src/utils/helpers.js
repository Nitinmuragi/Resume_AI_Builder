/**
 * Helper utilities
 */

/**
 * Format date string to readable format
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
}

/**
 * Truncate text to given length
 */
export const truncate = (str, n = 50) => {
  if (!str || str.length <= n) return str
  return str.slice(0, n) + '...'
}

/**
 * Extract initials from full name
 */
export const getInitials = (name = '') => {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

/**
 * Download blob as file
 */
export const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}
