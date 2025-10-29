/**
 * Centralized API client for Lift Oracle
 * Handles authentication, error handling, and request configuration
 * Uses cookie-based authentication (2025 security standards)
 */
import axios from 'axios'
import { baseUrl } from '../config'

/**
 * Create authenticated axios instance
 */
export const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,  // Always send cookies
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Request Interceptor
 * Add any request modifications here (e.g., CSRF tokens if needed)
 */
apiClient.interceptors.request.use(
  (config) => {
    // Future: Add CSRF token here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Response Interceptor
 * Handles authentication errors globally
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response

      // Handle 401 Unauthorized - session expired
      if (status === 401) {
        const currentPath = window.location.pathname

        // Don't redirect if already on login/register pages
        if (!['/login', '/register'].includes(currentPath)) {
          // Clear any legacy tokens
          try {
            localStorage.removeItem('token')
          } catch (e) {
            // Ignore errors
          }

          // Redirect to login with session expired flag
          window.location.href = '/login?session_expired=true'
        }
      }

      // Handle 403 Forbidden
      if (status === 403) {
        console.error('Access forbidden:', error.response.data)
      }

      // Handle 429 Rate Limit
      if (status === 429) {
        console.error('Rate limit exceeded. Please try again later.')
      }
    }

    return Promise.reject(error)
  }
)

/**
 * Convenience methods for API calls
 */
export const api = {
  get: (url, config = {}) => apiClient.get(url, config),
  post: (url, data = {}, config = {}) => apiClient.post(url, data, config),
  put: (url, data = {}, config = {}) => apiClient.put(url, data, config),
  delete: (url, config = {}) => apiClient.delete(url, config),
  patch: (url, data = {}, config = {}) => apiClient.patch(url, data, config),
}

export default apiClient
