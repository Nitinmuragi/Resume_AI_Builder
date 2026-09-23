import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { login as loginApi } from '../../api/authApi'
import { loginStart, loginSuccess, loginFailure } from '../../store/authSlice'
import { FiMail, FiLock, FiPhone, FiEye, FiEyeOff } from 'react-icons/fi'

export default function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [useEmail, setUseEmail] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', mobile_no: '', password: '' })

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.password) { toast.error('Password is required'); return }
    if (useEmail && !form.email) { toast.error('Email is required'); return }
    if (!useEmail && !form.mobile_no) { toast.error('Mobile number is required'); return }

    setLoading(true)
    dispatch(loginStart())
    try {
      const payload = { password: form.password }
      if (useEmail) payload.email = form.email
      else payload.mobile_no = form.mobile_no

      const res = await loginApi(payload)
      dispatch(loginSuccess(res.data))
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed'
      dispatch(loginFailure(msg))
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Toggle email / mobile */}
      <div className="flex rounded-lg border border-gray-200 p-1 gap-1">
        <button type="button" onClick={() => setUseEmail(true)}
          className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${useEmail ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
          Email
        </button>
        <button type="button" onClick={() => setUseEmail(false)}
          className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${!useEmail ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
          Mobile
        </button>
      </div>

      {useEmail ? (
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input name="email" type="email" placeholder="Email address" value={form.email}
            onChange={handleChange} className="input-field pl-9" />
        </div>
      ) : (
        <div className="relative">
          <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input name="mobile_no" type="tel" placeholder="Mobile number" value={form.mobile_no}
            onChange={handleChange} className="input-field pl-9" />
        </div>
      )}

      <div className="relative">
        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password}
          onChange={handleChange} className="input-field pl-9 pr-10" />
        <button type="button" onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        </button>
      </div>

      <div className="flex justify-end">
        <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}
