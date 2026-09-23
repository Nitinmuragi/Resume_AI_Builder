import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { forgotPassword as forgotPasswordApi } from '../api/authApi'
import { FiMail, FiFileText, FiArrowLeft, FiCheckCircle } from 'react-icons/fi'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error('Please enter your email address')
      return
    }

    setLoading(true)
    try {
      const res = await forgotPasswordApi(email.trim())
      toast.success(res.data?.message || 'Reset link sent!')
      setSubmitted(true)
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send reset link')
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
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <FiCheckCircle size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Check Your Email</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                If an account exists for <span className="font-semibold text-gray-800">{email}</span>, you will receive a password reset link shortly.
              </p>
              <p className="text-xs text-gray-400">
                Please also check your spam or junk folder if you don't see it within a couple minutes.
              </p>
              <div className="pt-4">
                <Link
                  to="/login"
                  className="btn-primary inline-flex items-center justify-center gap-2 w-full py-2.5"
                >
                  <FiArrowLeft size={16} />
                  Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Forgot Password?</h2>
              <p className="text-sm text-gray-500 mb-6">
                Enter your registered email and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-9"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-2.5"
                >
                  {loading ? 'Sending link...' : 'Send Reset Link'}
                </button>
              </form>

              <div className="text-center mt-6">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <FiArrowLeft size={16} />
                  Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
