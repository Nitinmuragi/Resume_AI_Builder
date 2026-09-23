import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { runAtsCheck, getAtsHistory } from '../api/atsApi'
import { listResumes } from '../api/resumeApi'
import Navbar from '../components/common/Navbar'
import JDInputBox from '../components/ats/JDInputBox'
import MatchScoreCard from '../components/ats/MatchScoreCard'
import KeywordChip from '../components/ats/KeywordChip'
import Loader from '../components/common/Loader'
import { FiTarget, FiClock } from 'react-icons/fi'

export default function AtsCheckPage() {
  const [searchParams] = useSearchParams()
  const [resumes, setResumes] = useState([])
  const [selectedResumeId, setSelectedResumeId] = useState(searchParams.get('resume_id') || '')
  const [jdText, setJdText] = useState('')
  const [jdTitle, setJdTitle] = useState('')
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(false)

  useEffect(() => {
    listResumes().then(res => setResumes(res.data)).catch(() => {})
  }, [])

  useEffect(() => {
    if (selectedResumeId) {
      setLoadingHistory(true)
      getAtsHistory(selectedResumeId)
        .then(res => setHistory(res.data))
        .catch(() => setHistory([]))
        .finally(() => setLoadingHistory(false))
    }
  }, [selectedResumeId])

  const handleCheck = async () => {
    if (!selectedResumeId) { toast.error('Please select a resume'); return }
    if (!jdText.trim()) { toast.error('Please paste a job description'); return }

    setLoading(true)
    setResult(null)
    try {
      const res = await runAtsCheck({ resume_id: parseInt(selectedResumeId), jd_text: jdText, jd_title: jdTitle })
      setResult(res.data)
      toast.success('ATS check complete!')
      // Refresh history
      const histRes = await getAtsHistory(selectedResumeId)
      setHistory(histRes.data)
    } catch (err) {
      toast.error(err.response?.data?.error || 'ATS check failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FiTarget className="text-blue-600" /> ATS Resume Check
          </h1>
          <p className="text-gray-500 text-sm mt-1">Paste a job description to see how well your resume matches</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Input */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Resume</label>
              <select
                value={selectedResumeId}
                onChange={e => setSelectedResumeId(e.target.value)}
                className="input-field"
              >
                <option value="">— Choose a resume —</option>
                {resumes.map(r => (
                  <option key={r.id} value={r.id}>{r.title}</option>
                ))}
              </select>

              <label className="block text-sm font-semibold text-gray-700 mb-2 mt-4">Job Title (optional)</label>
              <input
                type="text"
                value={jdTitle}
                onChange={e => setJdTitle(e.target.value)}
                placeholder="e.g. Senior Software Engineer at Google"
                className="input-field"
              />
            </div>

            <JDInputBox value={jdText} onChange={setJdText} />

            <button
              onClick={handleCheck}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-70 text-sm"
            >
              {loading ? (
                <><div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing...</>
              ) : (
                <><FiTarget size={16} /> Check ATS Score</>
              )}
            </button>
          </div>

          {/* Right: Results */}
          <div className="space-y-4">
            {loading && (
              <div className="bg-white rounded-xl border border-gray-200 p-10 flex justify-center">
                <Loader text="Running keyword analysis..." />
              </div>
            )}

            {result && !loading && (
              <>
                <MatchScoreCard score={result.match_score} />

                {/* Matched Keywords */}
                {result.matched_keywords?.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <h3 className="font-semibold text-gray-800 mb-3 text-sm">
                      ✅ Matched Keywords <span className="text-green-600">({result.matched_keywords.length})</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.matched_keywords.map(kw => (
                        <KeywordChip key={kw} label={kw} type="matched" />
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Keywords */}
                {result.missing_keywords?.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <h3 className="font-semibold text-gray-800 mb-3 text-sm">
                      ❌ Missing Keywords <span className="text-red-600">({result.missing_keywords.length})</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.missing_keywords.map(kw => (
                        <KeywordChip key={kw} label={kw} type="missing" />
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {result.suggestions?.length > 0 && (
                  <div className="bg-blue-50 rounded-xl border border-blue-200 p-5">
                    <h3 className="font-semibold text-blue-800 mb-3 text-sm">💡 Suggestions</h3>
                    <ul className="space-y-2">
                      {result.suggestions.map((s, i) => (
                        <li key={i} className="text-sm text-blue-700 flex gap-2">
                          <span className="shrink-0">→</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {!result && !loading && (
              <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400">
                <FiTarget size={40} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm">Select a resume, paste a JD, and click Check</p>
              </div>
            )}
          </div>
        </div>

        {/* History */}
        {selectedResumeId && history.length > 0 && (
          <div className="mt-8 bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiClock size={16} /> ATS Check History
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                    <th className="pb-2 font-semibold">Job Title</th>
                    <th className="pb-2 font-semibold">Score</th>
                    <th className="pb-2 font-semibold">Matched</th>
                    <th className="pb-2 font-semibold">Missing</th>
                    <th className="pb-2 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map(h => (
                    <tr key={h.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-2.5 text-gray-700">{h.jobDescription?.jd_title || 'Untitled'}</td>
                      <td className="py-2.5">
                        <span className={`font-bold ${
                          h.match_score >= 70 ? 'text-green-600' :
                          h.match_score >= 40 ? 'text-yellow-600' : 'text-red-600'
                        }`}>{h.match_score}%</span>
                      </td>
                      <td className="py-2.5 text-green-600">{h.matched_keywords?.length || 0}</td>
                      <td className="py-2.5 text-red-600">{h.missing_keywords?.length || 0}</td>
                      <td className="py-2.5 text-gray-400">{new Date(h.checked_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
