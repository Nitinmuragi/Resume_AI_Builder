import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { resetPassword as resetPasswordApi } from '../api/authApi'
import { FiLock, FiEye, FiEyeOff, FiFileText, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!token) {
      toast.error('Reset token is missing or invalid')
      return
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const res = await resetPasswordApi({ token, newPassword: password })
      toast.success(res.data?.message || 'Password reset successfully!')
      setResetSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 2500)
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to reset password. Token may have expired.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="bg-blue-600 text-white rounded-xl p-2">
              <FiFileText size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-900">ResumeAI</span>
          </div>
          <p className="text-gray-500 text-sm">Build ATS-optimized resumes in minutes</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!token ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                <FiAlertCircle size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Invalid Reset Link</h2>
              <p className="text-sm text-gray-600">
                This password reset link is invalid or incomplete. Please request a new password reset link.
              </p>
              <div className="pt-4">
                <Link
                  to="/forgot-password"
                  className="btn-primary inline-block w-full py-2.5 text-center"
                >
                  Request New Link
                </Link>
              </div>
            </div>
          ) : resetSuccess ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <FiCheckCircle size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Password Reset Complete!</h2>
              <p className="text-sm text-gray-600">
                Your password has been successfully updated. Redirecting you to login...
              </p>
              <div className="pt-4">
                <Link
                  to="/login"
                  className="btn-primary inline-block w-full py-2.5 text-center"
                >
                  Go to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Set New Password</h2>
              <p className="text-sm text-gray-500 mb-6">
                Please enter and confirm your new password below.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="New password (min 8 chars)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-9 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>

                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field pl-9"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-2.5"
                >
                  {loading ? 'Updating Password...' : 'Reset Password'}
                </button>
              </form>

              <div className="text-center mt-6">
                <Link
                  to="/login"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Cancel and return to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
