import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { register as registerApi } from '../../api/authApi'
import { loginSuccess } from '../../store/authSlice'
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff } from 'react-icons/fi'

export default function RegisterForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [useEmail, setUseEmail] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ fullName: '', email: '', mobile_no: '', password: '', confirmPassword: '' })

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.fullName.trim()) { toast.error('Full name is required'); return }
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return }
    if (form.password.length < 8) { toast.error('Password must be at least 8 characters'); return }

    setLoading(true)
    try {
      const payload = { fullName: form.fullName, password: form.password }
      if (useEmail) payload.email = form.email
      else payload.mobile_no = form.mobile_no

      const res = await registerApi(payload)
      dispatch(loginSuccess(res.data))
      toast.success('Account created! Welcome 🎉')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input name="fullName" placeholder="Full name" value={form.fullName}
          onChange={handleChange} className="input-field pl-9" autoComplete="name" required />
      </div>

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
            onChange={handleChange} className="input-field pl-9" autoComplete="username" />
        </div>
      ) : (
        <div className="relative">
          <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input name="mobile_no" type="tel" placeholder="Mobile number" value={form.mobile_no}
            onChange={handleChange} className="input-field pl-9" autoComplete="tel" />
        </div>
      )}

      <div className="relative">
        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Password (min 8 chars)" value={form.password}
          onChange={handleChange} className="input-field pl-9 pr-10" autoComplete="new-password" />
        <button type="button" onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        </button>
      </div>

      <div className="relative">
        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input name="confirmPassword" type="password" placeholder="Confirm password" value={form.confirmPassword}
          onChange={handleChange} className="input-field pl-9" autoComplete="new-password" />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">
        {loading ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  )
}
