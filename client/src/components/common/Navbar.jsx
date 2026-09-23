import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { logout } from '../../store/authSlice'
import { FiFileText, FiUser, FiGrid, FiTarget, FiLogOut, FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useSelector(state => state.auth)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
    navigate('/')
  }

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <FiGrid /> },
    { to: '/profile', label: 'Profile', icon: <FiUser /> },
    { to: '/templates', label: 'Templates', icon: <FiFileText /> },
    { to: '/ats-check', label: 'ATS Check', icon: <FiTarget /> },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white rounded-lg p-1.5">
              <FiFileText size={18} />
            </div>
            <span className="font-bold text-gray-900 text-lg">ResumeAI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* User + Logout */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Hi, <span className="font-semibold text-gray-900">{user?.full_name?.split(' ')[0]}</span>
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
            >
              <FiLogOut size={16} />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.to) ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {link.icon} {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <FiLogOut size={16} /> Logout
          </button>
        </div>
      )}
    </nav>
  )
}
