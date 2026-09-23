import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { fetchProfile } from '../store/profileSlice'
import * as profileApi from '../api/profileApi'
import Navbar from '../components/common/Navbar'
import Loader from '../components/common/Loader'
import { FiPlus, FiTrash2, FiSave, FiUser, FiCode, FiGlobe, FiBook, FiBriefcase, FiFolder, FiAward } from 'react-icons/fi'

const TABS = [
  { id: 'personal', label: 'Personal', icon: <FiUser size={14} /> },
  { id: 'skills', label: 'Skills', icon: <FiCode size={14} /> },
  { id: 'languages', label: 'Languages', icon: <FiGlobe size={14} /> },
  { id: 'education', label: 'Education', icon: <FiBook size={14} /> },
  { id: 'experience', label: 'Experience', icon: <FiBriefcase size={14} /> },
  { id: 'projects', label: 'Projects', icon: <FiFolder size={14} /> },
  { id: 'certifications', label: 'Certifications', icon: <FiAward size={14} /> },
]

const PROFICIENCY = ['Basic', 'Intermediate', 'Advanced']
const PROF_COLOR = { Basic: 'bg-yellow-100 text-yellow-700', Intermediate: 'bg-blue-100 text-blue-700', Advanced: 'bg-green-100 text-green-700' }

export default function ProfilePage() {
  const dispatch = useDispatch()
  const { profile, loading } = useSelector(state => state.profile)
  const [tab, setTab] = useState('personal')
  const [saving, setSaving] = useState(false)
  const [personalForm, setPersonalForm] = useState({})
  const [skillForm, setSkillForm] = useState({ skillName: '', proficiency: 'Basic' })
  const [langForm, setLangForm] = useState({ languageName: '', proficiency: 'Basic' })
  const [eduForm, setEduForm] = useState({ degree: '', institution: '', start_year: '', end_year: '', grade: '' })
  const [expForm, setExpForm] = useState({ company_name: '', designation: '', start_date: '', end_date: '', is_current: false, description: '' })
  const [projForm, setProjForm] = useState({ title: '', description: '', tech_used: '', project_link: '' })
  const [certForm, setCertForm] = useState({ title: '', issued_by: '', issue_date: '' })
  const [skillsMaster, setSkillsMaster] = useState([])
  const [langsMaster, setLangsMaster] = useState([])

  useEffect(() => { dispatch(fetchProfile()) }, [dispatch])
  useEffect(() => {
    profileApi.getSkillsMaster().then(r => setSkillsMaster(r.data)).catch(() => {})
    profileApi.getLanguagesMaster().then(r => setLangsMaster(r.data)).catch(() => {})
  }, [])

  useEffect(() => {
    if (profile) {
      setPersonalForm({
        full_name: profile.full_name || '',
        address: profile.profile?.address || '',
        dob: profile.profile?.dob || '',
        linkedin_url: profile.profile?.linkedin_url || '',
        github_url: profile.profile?.github_url || '',
        portfolio_url: profile.profile?.portfolio_url || '',
        summary: profile.profile?.summary || '',
      })
    }
  }, [profile])

  const savePersonal = async () => {
    setSaving(true)
    try {
      await profileApi.updateProfile(personalForm)
      dispatch(fetchProfile())
      toast.success('Profile saved!')
    } catch { toast.error('Failed to save profile') }
    finally { setSaving(false) }
  }

  const handleAddSkill = async (e) => {
    e.preventDefault()
    try {
      await profileApi.addSkill(skillForm)
      setSkillForm({ skillName: '', proficiency: 'Basic' })
      dispatch(fetchProfile())
      toast.success('Skill added!')
    } catch (err) { toast.error(err.response?.data?.error || 'Failed to add skill') }
  }

  const handleDeleteSkill = async (id) => {
    try {
      await profileApi.deleteSkill(id)
      dispatch(fetchProfile())
      toast.success('Skill removed')
    } catch { toast.error('Failed to remove skill') }
  }

  const handleAddLang = async (e) => {
    e.preventDefault()
    try {
      await profileApi.addLanguage(langForm)
      setLangForm({ languageName: '', proficiency: 'Basic' })
      dispatch(fetchProfile())
      toast.success('Language added!')
    } catch (err) { toast.error(err.response?.data?.error || 'Failed to add language') }
  }

  const handleAddEdu = async (e) => {
    e.preventDefault()
    try {
      await profileApi.addEducation(eduForm)
      setEduForm({ degree: '', institution: '', start_year: '', end_year: '', grade: '' })
      dispatch(fetchProfile())
      toast.success('Education added!')
    } catch { toast.error('Failed to add education') }
  }

  const handleAddExp = async (e) => {
    e.preventDefault()
    try {
      await profileApi.addExperience(expForm)
      setExpForm({ company_name: '', designation: '', start_date: '', end_date: '', is_current: false, description: '' })
      dispatch(fetchProfile())
      toast.success('Experience added!')
    } catch { toast.error('Failed to add experience') }
  }

  const handleAddProject = async (e) => {
    e.preventDefault()
    try {
      await profileApi.addProject(projForm)
      setProjForm({ title: '', description: '', tech_used: '', project_link: '' })
      dispatch(fetchProfile())
      toast.success('Project added!')
    } catch { toast.error('Failed to add project') }
  }

  const handleAddCert = async (e) => {
    e.preventDefault()
    try {
      await profileApi.addCertification(certForm)
      setCertForm({ title: '', issued_by: '', issue_date: '' })
      dispatch(fetchProfile())
      toast.success('Certification added!')
    } catch { toast.error('Failed to add certification') }
  }

  const inputClass = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap bg-white rounded-xl border border-gray-200 p-1.5 mb-6">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                tab === t.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {loading ? <div className="flex justify-center py-20"><Loader /></div> : (
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">

            {/* Personal Info */}
            {tab === 'personal' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[['Full Name', 'full_name'], ['Address', 'address'], ['Date of Birth', 'dob', 'date'],
                    ['LinkedIn URL', 'linkedin_url', 'url'], ['GitHub URL', 'github_url', 'url'],
                    ['Portfolio URL', 'portfolio_url', 'url']].map(([label, key, type = 'text']) => (
                    <div key={key}>
                      <label className="block text-xs text-gray-500 mb-1">{label}</label>
                      <input type={type} value={personalForm[key] || ''} onChange={e => setPersonalForm(p => ({ ...p, [key]: e.target.value }))} className={inputClass} />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Professional Summary</label>
                  <textarea value={personalForm.summary || ''} onChange={e => setPersonalForm(p => ({ ...p, summary: e.target.value }))} rows={4} className={inputClass + ' resize-y'} placeholder="Write a brief professional summary..." />
                </div>
                <button onClick={savePersonal} disabled={saving} className="btn-primary flex items-center gap-2">
                  <FiSave size={14} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}

            {/* Skills */}
            {tab === 'skills' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Skills</h2>
                <form onSubmit={handleAddSkill} className="flex gap-2 mb-5 flex-wrap">
                  <select value={skillForm.skillName} onChange={e => setSkillForm(p => ({ ...p, skillName: e.target.value }))} className="flex-1 min-w-0 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select a skill...</option>
                    {skillsMaster.map(s => <option key={s.id} value={s.skill_name}>{s.skill_name}</option>)}
                  </select>
                  <select value={skillForm.proficiency} onChange={e => setSkillForm(p => ({ ...p, proficiency: e.target.value }))} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {PROFICIENCY.map(p => <option key={p}>{p}</option>)}
                  </select>
                  <button type="submit" className="btn-primary flex items-center gap-1"><FiPlus size={14} /> Add</button>
                </form>
                {/* Custom skill input */}
                <div className="flex gap-2 mb-6">
                  <input placeholder="Or type a custom skill..." value={skillForm.skillName} onChange={e => setSkillForm(p => ({ ...p, skillName: e.target.value }))} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {(profile?.userSkills || []).map(us => (
                    <div key={us.id} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
                      <span className="text-sm text-gray-800">{us.skill?.skill_name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PROF_COLOR[us.proficiency]}`}>{us.proficiency}</span>
                      <button onClick={() => handleDeleteSkill(us.id)} className="text-gray-400 hover:text-red-500 transition-colors"><FiTrash2 size={12} /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {tab === 'languages' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Languages</h2>
                <form onSubmit={handleAddLang} className="flex gap-2 mb-5 flex-wrap">
                  <select value={langForm.languageName} onChange={e => setLangForm(p => ({ ...p, languageName: e.target.value }))} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select a language...</option>
                    {langsMaster.map(l => <option key={l.id} value={l.language_name}>{l.language_name}</option>)}
                  </select>
                  <select value={langForm.proficiency} onChange={e => setLangForm(p => ({ ...p, proficiency: e.target.value }))} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {PROFICIENCY.map(p => <option key={p}>{p}</option>)}
                  </select>
                  <button type="submit" className="btn-primary flex items-center gap-1"><FiPlus size={14} /> Add</button>
                </form>
                <div className="flex flex-wrap gap-2">
                  {(profile?.userLanguages || []).map(ul => (
                    <div key={ul.id} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
                      <span className="text-sm text-gray-800">{ul.language?.language_name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PROF_COLOR[ul.proficiency]}`}>{ul.proficiency}</span>
                      <button onClick={() => profileApi.deleteLanguage(ul.id).then(() => { dispatch(fetchProfile()); toast.success('Removed') })} className="text-gray-400 hover:text-red-500"><FiTrash2 size={12} /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {tab === 'education' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Education</h2>
                <form onSubmit={handleAddEdu} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 border border-gray-200 rounded-xl p-4 bg-gray-50">
                  {[['Degree', 'degree'], ['Institution', 'institution'], ['Start Year', 'start_year', 'number'], ['End Year', 'end_year', 'number'], ['Grade / CGPA', 'grade']].map(([l, k, t = 'text']) => (
                    <div key={k}>
                      <label className="block text-xs text-gray-500 mb-1">{l}</label>
                      <input type={t} value={eduForm[k] || ''} onChange={e => setEduForm(p => ({ ...p, [k]: e.target.value }))} className={inputClass} />
                    </div>
                  ))}
                  <div className="sm:col-span-2"><button type="submit" className="btn-primary flex items-center gap-1"><FiPlus size={14} /> Add Education</button></div>
                </form>
                <div className="space-y-3">
                  {(profile?.education || []).map(e => (
                    <div key={e.id} className="flex justify-between items-start bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div>
                        <div className="font-medium text-sm">{e.degree}</div>
                        <div className="text-xs text-gray-500">{e.institution} · {e.start_year}–{e.end_year} {e.grade && `· ${e.grade}`}</div>
                      </div>
                      <button onClick={() => profileApi.deleteEducation(e.id).then(() => { dispatch(fetchProfile()); toast.success('Removed') })} className="text-gray-400 hover:text-red-500"><FiTrash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {tab === 'experience' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Work Experience</h2>
                <form onSubmit={handleAddExp} className="space-y-3 mb-5 border border-gray-200 rounded-xl p-4 bg-gray-50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[['Company', 'company_name'], ['Designation', 'designation'], ['Start Date', 'start_date', 'date'], ['End Date', 'end_date', 'date']].map(([l, k, t = 'text']) => (
                      <div key={k}>
                        <label className="block text-xs text-gray-500 mb-1">{l}</label>
                        <input type={t} value={expForm[k] || ''} onChange={e => setExpForm(p => ({ ...p, [k]: e.target.value }))} className={inputClass} />
                      </div>
                    ))}
                  </div>
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" checked={expForm.is_current} onChange={e => setExpForm(p => ({ ...p, is_current: e.target.checked }))} />
                    Currently working here
                  </label>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Description</label>
                    <textarea value={expForm.description || ''} onChange={e => setExpForm(p => ({ ...p, description: e.target.value }))} rows={3} className={inputClass + ' resize-y'} />
                  </div>
                  <button type="submit" className="btn-primary flex items-center gap-1"><FiPlus size={14} /> Add Experience</button>
                </form>
                <div className="space-y-3">
                  {(profile?.experience || []).map(e => (
                    <div key={e.id} className="flex justify-between items-start bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div>
                        <div className="font-medium text-sm">{e.designation} at {e.company_name}</div>
                        <div className="text-xs text-gray-500">{e.start_date} – {e.is_current ? 'Present' : e.end_date}</div>
                        {e.description && <p className="text-xs text-gray-600 mt-1 line-clamp-2">{e.description}</p>}
                      </div>
                      <button onClick={() => profileApi.deleteExperience(e.id).then(() => { dispatch(fetchProfile()); toast.success('Removed') })} className="text-gray-400 hover:text-red-500 shrink-0 ml-2"><FiTrash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {tab === 'projects' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Projects</h2>
                <form onSubmit={handleAddProject} className="space-y-3 mb-5 border border-gray-200 rounded-xl p-4 bg-gray-50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[['Title', 'title'], ['Tech Used', 'tech_used']].map(([l, k]) => (
                      <div key={k}>
                        <label className="block text-xs text-gray-500 mb-1">{l}</label>
                        <input value={projForm[k] || ''} onChange={e => setProjForm(p => ({ ...p, [k]: e.target.value }))} className={inputClass} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Project Link</label>
                    <input type="url" value={projForm.project_link || ''} onChange={e => setProjForm(p => ({ ...p, project_link: e.target.value }))} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Description</label>
                    <textarea value={projForm.description || ''} onChange={e => setProjForm(p => ({ ...p, description: e.target.value }))} rows={3} className={inputClass + ' resize-y'} />
                  </div>
                  <button type="submit" className="btn-primary flex items-center gap-1"><FiPlus size={14} /> Add Project</button>
                </form>
                <div className="space-y-3">
                  {(profile?.projects || []).map(p => (
                    <div key={p.id} className="flex justify-between items-start bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div>
                        <div className="font-medium text-sm">{p.title}</div>
                        <div className="text-xs text-gray-500">{p.tech_used}</div>
                      </div>
                      <button onClick={() => profileApi.deleteProject(p.id).then(() => { dispatch(fetchProfile()); toast.success('Removed') })} className="text-gray-400 hover:text-red-500"><FiTrash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {tab === 'certifications' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Certifications</h2>
                <form onSubmit={handleAddCert} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 border border-gray-200 rounded-xl p-4 bg-gray-50">
                  {[['Title', 'title'], ['Issued By', 'issued_by'], ['Issue Date', 'issue_date', 'date']].map(([l, k, t = 'text']) => (
                    <div key={k}>
                      <label className="block text-xs text-gray-500 mb-1">{l}</label>
                      <input type={t} value={certForm[k] || ''} onChange={e => setCertForm(p => ({ ...p, [k]: e.target.value }))} className={inputClass} />
                    </div>
                  ))}
                  <div className="sm:col-span-2"><button type="submit" className="btn-primary flex items-center gap-1"><FiPlus size={14} /> Add Certification</button></div>
                </form>
                <div className="space-y-3">
                  {(profile?.certifications || []).map(c => (
                    <div key={c.id} className="flex justify-between items-center bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div>
                        <div className="font-medium text-sm">{c.title}</div>
                        <div className="text-xs text-gray-500">{c.issued_by} {c.issue_date && `· ${c.issue_date}`}</div>
                      </div>
                      <button onClick={() => profileApi.deleteCertification(c.id).then(() => { dispatch(fetchProfile()); toast.success('Removed') })} className="text-gray-400 hover:text-red-500"><FiTrash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  )
}
