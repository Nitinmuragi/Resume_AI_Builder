import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchResumeById } from '../store/resumeSlice'
import Navbar from '../components/common/Navbar'
import ResumePreview from '../components/resume/ResumePreview'
import Loader from '../components/common/Loader'
import { exportPDF } from '../api/resumeApi'
import { generateClientPdf } from '../utils/pdfGenerator'
import toast from 'react-hot-toast'
import { FiEdit2, FiDownload, FiArrowLeft } from 'react-icons/fi'

import { useLocation } from 'react-router-dom'

export default function ResumePreviewPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { currentResume, loading } = useSelector(state => state.resume)

  useEffect(() => { dispatch(fetchResumeById(id)) }, [id, dispatch])

  const handleExportPDF = async () => {
    const toastId = toast.loading('Generating PDF...')
    const filename = `${currentResume?.title || 'resume'}.pdf`

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
        await generateClientPdf('resume-preview-document', filename)
        toast.success('PDF downloaded!', { id: toastId })
      } catch (clientErr) {
        console.error('Client PDF generation failed:', clientErr)
        toast.error('PDF generation failed', { id: toastId })
      }
    }
  }

  useEffect(() => {
    if (location.state?.autoDownload && currentResume && !loading) {
      handleExportPDF()
    }
  }, [location.state, currentResume, loading])

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
            <FiArrowLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={() => navigate(`/resume/${id}/edit`)} className="flex items-center gap-1.5 text-xs sm:text-sm border border-gray-300 bg-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm">
              <FiEdit2 size={14} /> <span>Edit Resume</span>
            </button>
            <button onClick={handleExportPDF} className="flex items-center gap-1.5 text-xs sm:text-sm bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
              <FiDownload size={14} /> <span>Download PDF</span>
            </button>
          </div>
        </div>

        {loading || !currentResume ? (
          <div className="flex justify-center py-20"><Loader /></div>
        ) : (
          <div className="shadow-2xl rounded-xl overflow-x-auto bg-white">
            <div className="min-w-[320px]">
              <ResumePreview resumeData={currentResume.resume_data} template={currentResume.template} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
