import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProtectedRoute from './components/common/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import Dashboard from './pages/Dashboard'
import ProfilePage from './pages/ProfilePage'
import TemplateSelectionPage from './pages/TemplateSelectionPage'
import ResumeBuilderPage from './pages/ResumeBuilderPage'
import AtsCheckPage from './pages/AtsCheckPage'
import ResumePreviewPage from './pages/ResumePreviewPage'

function App() {
  const { isAuthenticated } = useSelector(state => state.auth)

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" replace />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" replace />} />
        <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPasswordPage /> : <Navigate to="/dashboard" replace />} />
        <Route path="/reset-password" element={!isAuthenticated ? <ResetPasswordPage /> : <Navigate to="/dashboard" replace />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/templates" element={<TemplateSelectionPage />} />
          <Route path="/resume/new" element={<ResumeBuilderPage />} />
          <Route path="/resume/:id/edit" element={<ResumeBuilderPage />} />
          <Route path="/resume/:id/preview" element={<ResumePreviewPage />} />
          <Route path="/ats-check" element={<AtsCheckPage />} />
        </Route>

        {/* Public landing page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
