import { useState } from 'react'
import { FiChevronDown, FiChevronUp, FiPlus, FiTrash2 } from 'react-icons/fi'

// Generic accordion section wrapper
function Section({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800 text-sm">{title}</span>
        {open ? <FiChevronUp size={16} className="text-gray-400 shrink-0" /> : <FiChevronDown size={16} className="text-gray-400 shrink-0" />}
      </button>
      {open && <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-gray-100">{children}</div>}
    </div>
  )
}

export default function ResumeSectionEditor({ resumeData, onChange }) {
  const update = (key, val) => onChange({ ...resumeData, [key]: val })
  const updatePersonal = (field, val) =>
    onChange({ ...resumeData, personalInfo: { ...resumeData.personalInfo, [field]: val } })

  // Skills
  const addSkill = () => update('skills', [...(resumeData.skills || []), { name: '', proficiency: 'Basic' }])
  const updateSkill = (i, field, val) => {
    const skills = [...(resumeData.skills || [])]
    skills[i] = { ...skills[i], [field]: val }
    update('skills', skills)
  }
  const removeSkill = (i) => update('skills', resumeData.skills.filter((_, idx) => idx !== i))

  // Experience
  const addExp = () => update('experience', [...(resumeData.experience || []), { company: '', designation: '', startDate: '', endDate: '', isCurrent: false, description: '' }])
  const updateExp = (i, field, val) => {
    const arr = [...(resumeData.experience || [])]
    arr[i] = { ...arr[i], [field]: val }
    update('experience', arr)
  }
  const removeExp = (i) => update('experience', resumeData.experience.filter((_, idx) => idx !== i))

  // Education
  const addEdu = () => update('education', [...(resumeData.education || []), { degree: '', institution: '', startYear: '', endYear: '', grade: '' }])
  const updateEdu = (i, field, val) => {
    const arr = [...(resumeData.education || [])]
    arr[i] = { ...arr[i], [field]: val }
    update('education', arr)
  }
  const removeEdu = (i) => update('education', resumeData.education.filter((_, idx) => idx !== i))

  // Projects
  const addProject = () => update('projects', [...(resumeData.projects || []), { title: '', description: '', techUsed: '', projectLink: '' }])
  const updateProject = (i, field, val) => {
    const arr = [...(resumeData.projects || [])]
    arr[i] = { ...arr[i], [field]: val }
    update('projects', arr)
  }
  const removeProject = (i) => update('projects', resumeData.projects.filter((_, idx) => idx !== i))

  // Certifications
  const addCert = () => update('certifications', [...(resumeData.certifications || []), { title: '', issuedBy: '', issueDate: '' }])
  const updateCert = (i, field, val) => {
    const arr = [...(resumeData.certifications || [])]
    arr[i] = { ...arr[i], [field]: val }
    update('certifications', arr)
  }
  const removeCert = (i) => update('certifications', resumeData.certifications.filter((_, idx) => idx !== i))

  const field = (label, val, setter, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      <input type={type} value={val || ''} onChange={e => setter(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
  )

  return (
    <div className="space-y-3">
      {/* Personal Info */}
      <Section title="👤 Personal Information" defaultOpen>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {field('Full Name', resumeData.personalInfo?.name, v => updatePersonal('name', v))}
          {field('Email', resumeData.personalInfo?.email, v => updatePersonal('email', v), 'email')}
          {field('Phone', resumeData.personalInfo?.phone, v => updatePersonal('phone', v), 'tel')}
          {field('Address', resumeData.personalInfo?.address, v => updatePersonal('address', v))}
          {field('LinkedIn URL', resumeData.personalInfo?.linkedin, v => updatePersonal('linkedin', v), 'url')}
          {field('GitHub URL', resumeData.personalInfo?.github, v => updatePersonal('github', v), 'url')}
          {field('Portfolio URL', resumeData.personalInfo?.portfolio, v => updatePersonal('portfolio', v), 'url')}
        </div>
      </Section>

      {/* Summary */}
      <Section title="📝 Professional Summary">
        <div className="mt-4">
          <textarea
            value={resumeData.summary || ''}
            onChange={e => update('summary', e.target.value)}
            rows={4}
            placeholder="Write a brief professional summary..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>
      </Section>

      {/* Skills */}
      <Section title="🛠️ Skills">
        <div className="mt-4 space-y-2">
          {(resumeData.skills || []).map((skill, i) => (
            <div key={i} className="flex items-center gap-2">
              <input value={skill.name || ''} onChange={e => updateSkill(i, 'name', e.target.value)}
                placeholder="Skill name" className="flex-1 min-w-0 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <select value={skill.proficiency || 'Basic'} onChange={e => updateSkill(i, 'proficiency', e.target.value)}
                className="border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0">
                <option>Basic</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <button onClick={() => removeSkill(i)} className="text-red-400 hover:text-red-600 p-1 shrink-0"><FiTrash2 size={14} /></button>
            </div>
          ))}
          <button onClick={addSkill} className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 mt-1">
            <FiPlus size={14} /> Add Skill
          </button>
        </div>
      </Section>

      {/* Experience */}
      <Section title="💼 Work Experience">
        <div className="mt-4 space-y-4">
          {(resumeData.experience || []).map((exp, i) => (
            <div key={i} className="border border-gray-100 rounded-lg p-3 space-y-2 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-500">Experience #{i + 1}</span>
                <button onClick={() => removeExp(i)} className="text-red-400 hover:text-red-600"><FiTrash2 size={14} /></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {field('Company', exp.company, v => updateExp(i, 'company', v))}
                {field('Designation', exp.designation, v => updateExp(i, 'designation', v))}
                {field('Start Date', exp.startDate, v => updateExp(i, 'startDate', v), 'date')}
                {field('End Date', exp.endDate, v => updateExp(i, 'endDate', v), 'date')}
              </div>
              <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                <input type="checkbox" checked={exp.isCurrent || false} onChange={e => updateExp(i, 'isCurrent', e.target.checked)} />
                Currently working here
              </label>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Description</label>
                <textarea value={exp.description || ''} onChange={e => updateExp(i, 'description', e.target.value)}
                  rows={3} placeholder="Describe your responsibilities and achievements..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
              </div>
            </div>
          ))}
          <button onClick={addExp} className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700">
            <FiPlus size={14} /> Add Experience
          </button>
        </div>
      </Section>

      {/* Education */}
      <Section title="🎓 Education">
        <div className="mt-4 space-y-4">
          {(resumeData.education || []).map((edu, i) => (
            <div key={i} className="border border-gray-100 rounded-lg p-3 space-y-2 bg-gray-50">
              <div className="flex justify-between">
                <span className="text-xs font-semibold text-gray-500">Education #{i + 1}</span>
                <button onClick={() => removeEdu(i)} className="text-red-400 hover:text-red-600"><FiTrash2 size={14} /></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {field('Degree', edu.degree, v => updateEdu(i, 'degree', v))}
                {field('Institution', edu.institution, v => updateEdu(i, 'institution', v))}
                {field('Start Year', edu.startYear, v => updateEdu(i, 'startYear', v), 'number')}
                {field('End Year', edu.endYear, v => updateEdu(i, 'endYear', v), 'number')}
                {field('Grade / CGPA', edu.grade, v => updateEdu(i, 'grade', v))}
              </div>
            </div>
          ))}
          <button onClick={addEdu} className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700">
            <FiPlus size={14} /> Add Education
          </button>
        </div>
      </Section>

      {/* Projects */}
      <Section title="🚀 Projects">
        <div className="mt-4 space-y-4">
          {(resumeData.projects || []).map((proj, i) => (
            <div key={i} className="border border-gray-100 rounded-lg p-3 space-y-2 bg-gray-50">
              <div className="flex justify-between">
                <span className="text-xs font-semibold text-gray-500">Project #{i + 1}</span>
                <button onClick={() => removeProject(i)} className="text-red-400 hover:text-red-600"><FiTrash2 size={14} /></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {field('Project Title', proj.title, v => updateProject(i, 'title', v))}
                {field('Tech Used', proj.techUsed, v => updateProject(i, 'techUsed', v), 'text', 'React, Node.js, MySQL')}
              </div>
              {field('Project Link', proj.projectLink, v => updateProject(i, 'projectLink', v), 'url', 'https://github.com/...')}
              <div>
                <label className="block text-xs text-gray-500 mb-1">Description</label>
                <textarea value={proj.description || ''} onChange={e => updateProject(i, 'description', e.target.value)}
                  rows={2} placeholder="Brief project description..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
              </div>
            </div>
          ))}
          <button onClick={addProject} className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700">
            <FiPlus size={14} /> Add Project
          </button>
        </div>
      </Section>

      {/* Certifications */}
      <Section title="🏅 Certifications">
        <div className="mt-4 space-y-3">
          {(resumeData.certifications || []).map((cert, i) => (
            <div key={i} className="border border-gray-100 rounded-lg p-3 space-y-2 bg-gray-50">
              <div className="flex justify-between">
                <span className="text-xs font-semibold text-gray-500">Certification #{i + 1}</span>
                <button onClick={() => removeCert(i)} className="text-red-400 hover:text-red-600"><FiTrash2 size={14} /></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {field('Title', cert.title, v => updateCert(i, 'title', v))}
                {field('Issued By', cert.issuedBy, v => updateCert(i, 'issuedBy', v))}
                {field('Issue Date', cert.issueDate, v => updateCert(i, 'issueDate', v), 'date')}
              </div>
            </div>
          ))}
          <button onClick={addCert} className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700">
            <FiPlus size={14} /> Add Certification
          </button>
        </div>
      </Section>
    </div>
  )
}
