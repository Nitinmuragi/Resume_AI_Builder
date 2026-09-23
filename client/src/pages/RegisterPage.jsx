import RegisterForm from '../components/auth/RegisterForm'
import { Link } from 'react-router-dom'
import { FiFileText } from 'react-icons/fi'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
          <h2 className="text-xl font-bold text-gray-900 mb-1">Create your account</h2>
          <p className="text-sm text-gray-500 mb-6">Join thousands building better resumes</p>
          <RegisterForm />
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
