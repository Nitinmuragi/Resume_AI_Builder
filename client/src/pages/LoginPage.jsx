import LoginForm from '../components/auth/LoginForm'
import { Link } from 'react-router-dom'
import { FiFileText } from 'react-icons/fi'

export default function LoginPage() {
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
          <h2 className="text-xl font-bold text-gray-900 mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-6">Sign in to your account</p>
          <LoginForm />
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-medium hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
