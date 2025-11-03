import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { Spinner } from '../../pages/Spinners/Spinner'

/**
 * ProtectedRoute Component
 *
 * Wraps routes that require authentication.
 * Shows loading state during verification.
 * Redirects to login if unauthenticated.
 *
 * Usage:
 *   <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const { user, isLoading } = useSelector((state) => state.auth)

  // Show branded MB loading spinner during authentication verification
  if (isLoading) {
    return <Spinner />
  }

  // Redirect to login if not authenticated
  // Save the attempted URL for redirect after login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Render protected content
  return children
}

export default ProtectedRoute
