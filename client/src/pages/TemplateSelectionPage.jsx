import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { fetchTemplates } from '../store/resumeSlice'
import { createResume } from '../api/resumeApi'
import Navbar from '../components/common/Navbar'
import Loader from '../components/common/Loader'
import { FiCheck } from 'react-icons/fi'

const CATEGORIES = [
  'All',
  'Modern',
  'Minimal',
  'Creative',
  'ATS-Friendly',
  'Professional',
  'Academic',
  'Compact',
  'Creative-ATS',
]

const TEMPLATE_DESCRIPTIONS = {
  Modern: 'Two-column layout with a dark header. Professional and corporate.',
  Minimal: 'Clean single-column, thin borders. Elegant and simple.',
  Creative: 'Sidebar layout with accent colors. Bold and contemporary.',
  'ATS-Friendly': 'Simple single-column, optimized for ATS parsers. No-frills, highly readable.',
  Professional: 'Executive corporate layout with deep navy accents and clear ATS hierarchy.',
  Academic: 'Curriculum Vitae layout emphasizing credentials, research, and publications.',
  Compact: 'High-density single-page layout designed to pack maximum content cleanly.',
  'Creative-ATS': 'Visually engaging styling with modern violet badges and 100% linear ATS flow.',
}

export default function TemplateSelectionPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { templates, loading } = useSelector(state => state.resume)
  const [filter, setFilter] = useState('All')
  const [selecting, setSelecting] = useState(null)

  useEffect(() => { dispatch(fetchTemplates()) }, [dispatch])

  const filtered = filter === 'All' ? templates : templates.filter(t => t.category === filter)

  const handleSelect = async (template) => {
    setSelecting(template.id)
    try {
      const res = await createResume({
        template_id: template.id,
        title: `My ${template.template_name} Resume`,
      })
      navigate(`/resume/${res.data.id}/edit`)
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create resume')
      setSelecting(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose a Template</h1>
          <p className="text-gray-500">Select a professional template to start building your resume</p>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 flex-wrap justify-center mb-8">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(template => (
              <div key={template.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group">
                {/* Preview */}
                <div
                  className="h-48 flex flex-col items-center justify-center relative overflow-hidden bg-gray-50"
                  style={{ background: `linear-gradient(135deg, ${template.thumbnail_color || '#1e3a5f'}ee, ${template.thumbnail_color || '#1e3a5f'}99)` }}
                >
                  {template.thumbnail_url ? (
                    <img
                      src={template.thumbnail_url}
                      alt={template.template_name}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-28 bg-white/20 backdrop-blur-sm rounded p-2 space-y-1.5">
                      <div className="h-2 bg-white/80 rounded w-3/4 mx-auto" />
                      <div className="h-1 bg-white/60 rounded w-1/2 mx-auto" />
                      <div className="border-t border-white/40 pt-1.5 space-y-1">
                        <div className="h-1 bg-white/50 rounded" />
                        <div className="h-1 bg-white/50 rounded w-4/5" />
                        <div className="h-1 bg-white/50 rounded w-3/5" />
                      </div>
                    </div>
                  )}
                  <span className="absolute top-2 right-2 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
                    {template.category}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{template.template_name}</h3>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                    {TEMPLATE_DESCRIPTIONS[template.template_name] || ''}
                  </p>
                  <button
                    onClick={() => handleSelect(template)}
                    disabled={selecting === template.id}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-70"
                  >
                    {selecting === template.id ? (
                      <><div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating...</>
                    ) : (
                      <><FiCheck size={14} /> Use This Template</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
