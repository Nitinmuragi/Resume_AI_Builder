import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { fetchResumeById } from '../store/resumeSlice'
import { fetchProfile } from '../store/profileSlice'
import { updateResume } from '../api/resumeApi'
import { exportPDF } from '../api/resumeApi'
import { generateClientPdf } from '../utils/pdfGenerator'
import Navbar from '../components/common/Navbar'
import Loader from '../components/common/Loader'
import ResumeSectionEditor from '../components/resume/ResumeSectionEditor'
import ResumePreview from '../components/resume/ResumePreview'
import { FiSave, FiDownload, FiEye } from 'react-icons/fi'

export default function ResumeBuilderPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentResume, loading } = useSelector(state => state.resume)
  const { profile } = useSelector(state => state.profile)

  const [resumeData, setResumeData] = useState(null)
  const [title, setTitle] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(fetchResumeById(id))
      dispatch(fetchProfile())
    }
  }, [id, dispatch])

  useEffect(() => {
    if (currentResume) {
      setTitle(currentResume.title || '')
      setTargetRole(currentResume.target_role || '')
      // If no resume_data yet, pre-populate from profile
      if (!currentResume.resume_data || Object.keys(currentResume.resume_data).length === 0) {
        if (profile) {
          setResumeData(buildDataFromProfile(profile))
        } else {
          setResumeData(getEmptyData())
        }
      } else {
        setResumeData(currentResume.resume_data)
      }
    }
  }, [currentResume, profile])

  const buildDataFromProfile = (prof) => ({
    personalInfo: {
      name: prof.full_name || '',
      email: prof.email || '',
      phone: prof.mobile_no || '',
      address: prof.profile?.address || '',
      linkedin: prof.profile?.linkedin_url || '',
      github: prof.profile?.github_url || '',
      portfolio: prof.profile?.portfolio_url || '',
      photoUrl: prof.profile?.photo_url || '',
    },
    summary: prof.profile?.summary || '',
    skills: (prof.userSkills || []).map(us => ({ name: us.skill?.skill_name, proficiency: us.proficiency })),
    experience: (prof.experience || []).map(e => ({
      company: e.company_name, designation: e.designation,
      startDate: e.start_date, endDate: e.end_date,
      isCurrent: e.is_current, description: e.description,
    })),
    education: (prof.education || []).map(e => ({
      degree: e.degree, institution: e.institution,
      startYear: e.start_year, endYear: e.end_year, grade: e.grade,
    })),
    projects: (prof.projects || []).map(p => ({
      title: p.title, description: p.description,
      techUsed: p.tech_used, projectLink: p.project_link,
    })),
    certifications: (prof.certifications || []).map(c => ({
      title: c.title, issuedBy: c.issued_by, issueDate: c.issue_date,
    })),
    languages: (prof.userLanguages || []).map(ul => ({
      name: ul.language?.language_name, proficiency: ul.proficiency,
    })),
  })

  const getEmptyData = () => ({
    personalInfo: { name: '', email: '', phone: '', address: '', linkedin: '', github: '', portfolio: '' },
    summary: '',
    skills: [],
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    languages: [],
  })

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateResume(id, { title, target_role: targetRole, resume_data: resumeData })
      toast.success('Resume saved!')
    } catch {
      toast.error('Failed to save resume')
    } finally {
      setSaving(false)
    }
  }

  const handleExportPDF = async () => {
    // Save first
    await handleSave()
    const toastId = toast.loading('Generating PDF...')
    const filename = `${title || 'resume'}.pdf`

    try {
      const res = await exportPDF(id)
      if (res.data?.type && res.data.type.includes('application/json')) {
        throw new Error('Server returned JSON instead of PDF')
      }
      const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
      toast.success('PDF downloaded!', { id: toastId })
    } catch (serverErr) {
      console.warn('Server PDF export failed, falling back to client-side generator:', serverErr)
      try {
        const targetId = showPreview ? 'resume-preview-document' : 'resume-builder-hidden-preview-doc'
        await generateClientPdf(targetId, filename)
        toast.success('PDF downloaded!', { id: toastId })
      } catch (clientErr) {
        console.error('Client PDF generation failed:', clientErr)
        toast.error('PDF generation failed', { id: toastId })
      }
    }
  }

  if (loading || !resumeData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-96"><Loader text="Loading resume builder..." /></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 sticky top-16 z-40 shadow-sm">
        <div className="flex items-center justify-between gap-2 max-w-7xl mx-auto">
          {/* Inputs */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full min-w-0 max-w-[150px] sm:max-w-xs border border-gray-300 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Resume title"
              title="Resume title"
            />
            <input
              value={targetRole}
              onChange={e => setTargetRole(e.target.value)}
              className="flex-1 max-w-xs border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 hidden md:block"
              placeholder="Target role (e.g. Software Developer)"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1 text-xs sm:text-sm text-gray-700 border border-gray-300 px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors shrink-0"
            >
              <FiEye size={14} className="shrink-0" />
              <span>{showPreview ? 'Edit' : 'Preview'}</span>
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 text-xs sm:text-sm bg-blue-600 text-white px-3 sm:px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 font-semibold shrink-0 shadow-sm active:scale-95"
            >
              <FiSave size={14} className="shrink-0" />
              <span>{saving ? 'Saving...' : 'Save'}</span>
            </button>
            <button
              type="button"
              onClick={handleExportPDF}
              className="flex items-center gap-1 text-xs sm:text-sm bg-emerald-600 text-white px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors font-medium shrink-0 shadow-sm active:scale-95"
              title="Download PDF"
            >
              <FiDownload size={14} className="shrink-0" />
              <span className="hidden sm:inline">Export PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Builder / Preview */}
      <div className={`flex-1 flex ${showPreview ? 'flex-col lg:flex-row' : ''}`}>
        <div className={`${showPreview ? 'lg:w-1/2' : 'w-full max-w-3xl mx-auto'} p-3 sm:p-4 lg:p-6`}>
          <ResumeSectionEditor resumeData={resumeData} onChange={setResumeData} />
        </div>
        {showPreview && (
          <div className="lg:w-1/2 p-3 sm:p-4 lg:p-6 bg-gray-100 overflow-x-auto">
            <div className="max-w-2xl mx-auto overflow-x-auto">
              <ResumePreview
                resumeData={resumeData}
                template={currentResume?.template}
              />
            </div>
          </div>
        )}
      </div>

      {/* Hidden offscreen container for PDF generation when preview toggle is off */}
      <div
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          width: '794px',
          pointerEvents: 'none',
          opacity: 0,
          zIndex: -999,
        }}
        aria-hidden="true"
      >
        <ResumePreview
          resumeData={resumeData}
          template={currentResume?.template}
          id="resume-builder-hidden-preview-doc"
        />
      </div>
    </div>
  )
}
