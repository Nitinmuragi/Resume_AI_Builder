import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { fetchResumes, removeResume } from '../store/resumeSlice'
import { duplicateResume, deleteResume, exportPDF } from '../api/resumeApi'
import Navbar from '../components/common/Navbar'
import Loader from '../components/common/Loader'
import { FiPlus, FiEdit2, FiCopy, FiTrash2, FiDownload, FiTarget, FiClock, FiFileText } from 'react-icons/fi'

const TEMPLATE_COLORS = {
  Modern: '#1e3a5f',
  Minimal: '#6b7280',
  Creative: '#0d9488',
  'ATS-Friendly': '#1d4ed8',
}

export default function Dashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { resumes, loading } = useSelector(state => state.resume)
  const { user } = useSelector(state => state.auth)
  const [deletingId, setDeletingId] = useState(null)
  const [duplicatingId, setDuplicatingId] = useState(null)

  useEffect(() => { dispatch(fetchResumes()) }, [dispatch])

  const handleDelete = async (id) => {
    if (!confirm('Delete this resume? This cannot be undone.')) return
    setDeletingId(id)
    try {
      await deleteResume(id)
      dispatch(removeResume(id))
      toast.success('Resume deleted')
    } catch {
      toast.error('Failed to delete resume')
    } finally {
      setDeletingId(null)
    }
  }

  const handleDuplicate = async (id) => {
    setDuplicatingId(id)
    try {
      await duplicateResume(id)
      toast.success('Resume duplicated!')
      dispatch(fetchResumes())
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to duplicate resume')
    } finally {
      setDuplicatingId(null)
    }
  }

  const handleExportPDF = async (id, title) => {
    const toastId = toast.loading('Generating PDF...')
    try {
      const res = await exportPDF(id)
      if (res.data?.type && res.data.type.includes('application/json')) {
        throw new Error('Server returned JSON instead of PDF')
      }
      const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
      const a = document.createElement('a')
      a.href = url
      a.download = `${title || 'resume'}.pdf`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('PDF downloaded!', { id: toastId })
    } catch {
      toast.dismiss(toastId)
      navigate(`/resume/${id}/preview`, { state: { autoDownload: true } })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
            <p className="text-gray-500 text-sm mt-1">
              {resumes.length} of 12 resumes used
            </p>
          </div>
          <Link to="/templates"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <FiPlus size={18} />
            Create New Resume
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader text="Loading resumes..." /></div>
        ) : resumes.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20">
            <div className="bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <FiFileText size={40} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No resumes yet</h3>
            <p className="text-gray-500 mb-6">Create your first ATS-optimized resume in minutes</p>
            <Link to="/templates" className="btn-primary px-8 py-3">
              Get Started
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map(resume => {
              const color = resume.template?.thumbnail_color || TEMPLATE_COLORS[resume.template?.template_name] || '#3b82f6'
              return (
                <div key={resume.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  {/* Color thumbnail */}
                  <div className="h-32 flex items-center justify-center" style={{ background: color }}>
                    <FiFileText size={40} className="text-white opacity-60" />
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">{resume.title}</h3>
                      {resume.last_ats_score !== null && (
                        <span className={`ml-2 text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          resume.last_ats_score >= 70 ? 'bg-green-100 text-green-700' :
                          resume.last_ats_score >= 40 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {resume.last_ats_score}%
                        </span>
                      )}
                    </div>
                    {resume.target_role && (
                      <p className="text-xs text-gray-500 mb-1">{resume.target_role}</p>
                    )}
                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                      <FiClock size={11} />
                      <span>{new Date(resume.updated_at).toLocaleDateString()}</span>
                      <span className="mx-1">·</span>
                      <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
                        {resume.template?.template_name || 'Template'}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button onClick={() => navigate(`/resume/${resume.id}/edit`)}
                        className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1.5 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                        <FiEdit2 size={12} /> Edit
                      </button>
                      <button onClick={() => handleDuplicate(resume.id)} disabled={duplicatingId === resume.id}
                        className="flex items-center gap-1 text-xs bg-gray-50 text-gray-700 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                        <FiCopy size={12} /> {duplicatingId === resume.id ? '...' : 'Clone'}
                      </button>
                      <button onClick={() => navigate(`/ats-check?resume_id=${resume.id}`)}
                        className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors font-medium">
                        <FiTarget size={12} /> ATS
                      </button>
                      <button onClick={() => handleExportPDF(resume.id, resume.title)}
                        className="flex items-center gap-1 text-xs bg-purple-50 text-purple-700 px-2.5 py-1.5 rounded-lg hover:bg-purple-100 transition-colors font-medium">
                        <FiDownload size={12} /> PDF
                      </button>
                      <button onClick={() => handleDelete(resume.id)} disabled={deletingId === resume.id}
                        className="flex items-center gap-1 text-xs bg-red-50 text-red-600 px-2.5 py-1.5 rounded-lg hover:bg-red-100 transition-colors font-medium ml-auto">
                        <FiTrash2 size={12} /> {deletingId === resume.id ? '...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
