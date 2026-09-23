/* Professional Template — Executive corporate styling with navy accents and strict ATS hierarchy */
export default function ProfessionalTemplate({ resumeData = {} }) {
  const p = resumeData.personalInfo || {}
  const skills = resumeData.skills || []
  const experience = resumeData.experience || []
  const education = resumeData.education || []
  const projects = resumeData.projects || []
  const certs = resumeData.certifications || []
  const languages = resumeData.languages || []

  const PRIMARY = '#1e3a8a' // Deep Corporate Navy
  const SECONDARY = '#0f172a' // Dark Slate

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ width: '4px', height: '14px', background: PRIMARY, marginRight: '8px', borderRadius: '1px' }} />
        <h2 style={{
          fontSize: '12.5px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: PRIMARY,
          margin: 0,
        }}>
          {title}
        </h2>
        <div style={{ flex: 1, height: '1px', background: '#cbd5e1', marginLeft: '12px' }} />
      </div>
      <div>{children}</div>
    </div>
  )

  const profBadge = (level) => {
    const map = {
      Advanced: { bg: '#dbeafe', text: '#1e40af' },
      Intermediate: { bg: '#f1f5f9', text: '#334155' },
      Basic: { bg: '#f8fafc', text: '#64748b' },
    }
    const s = map[level] || map.Intermediate
    return {
      fontSize: '9.5px',
      padding: '1px 6px',
      borderRadius: '4px',
      background: s.bg,
      color: s.text,
      fontWeight: '600',
      marginLeft: '6px',
    }
  }

  return (
    <div
      className="bg-white font-sans text-gray-900"
      style={{
        fontFamily: "'Segoe UI', Arial, sans-serif', Helvetica, sans-serif",
        fontSize: '11px',
        padding: '36px 44px',
        minHeight: '1056px',
        color: '#1e293b',
        lineHeight: 1.5,
      }}
    >
      {/* Header */}
      <div style={{ borderBottom: `2px solid ${PRIMARY}`, paddingBottom: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: SECONDARY, margin: 0, letterSpacing: '-0.3px' }}>
              {p.name || 'Your Name'}
            </h1>
            {(resumeData.targetRole || p.title) && (
              <div style={{ fontSize: '13px', fontWeight: '600', color: PRIMARY, marginTop: '3px', letterSpacing: '0.5px' }}>
                {resumeData.targetRole || p.title}
              </div>
            )}
          </div>
        </div>

        {/* Contact Strip */}
        <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '10px', color: '#475569' }}>
          {p.email && <span>✉ {p.email}</span>}
          {p.phone && <span>📞 {p.phone}</span>}
          {p.address && <span>📍 {p.address}</span>}
          {p.linkedin && <span>💼 {p.linkedin}</span>}
          {p.github && <span>💻 {p.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {resumeData.summary && (
        <Section title="Executive Summary">
          <p style={{ fontSize: '11px', lineHeight: '1.6', color: '#334155', margin: 0 }}>
            {resumeData.summary}
          </p>
        </Section>
      )}

      {/* Work Experience */}
      {experience.length > 0 && (
        <Section title="Professional Experience">
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: i === experience.length - 1 ? 0 : '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div>
                  <strong style={{ fontSize: '11.5px', color: SECONDARY }}>{e.designation || e.role || e.title}</strong>
                  <span style={{ color: PRIMARY, fontWeight: '600', fontSize: '11px' }}> · {e.company || e.company_name}</span>
                </div>
                <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '500' }}>
                  {e.startDate || e.start_date} – {e.isCurrent || e.is_current ? 'Present' : (e.endDate || e.end_date)}
                </span>
              </div>
              {e.description && (
                <p style={{ marginTop: '4px', fontSize: '10.5px', lineHeight: '1.55', color: '#475569', margin: '4px 0 0' }}>
                  {e.description}
                </p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education">
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: i === education.length - 1 ? 0 : '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <div>
                <strong style={{ fontSize: '11px', color: SECONDARY }}>{e.degree}</strong>
                <span style={{ color: '#475569' }}> — {e.institution}</span>
                {e.grade && (
                  <span style={{ fontSize: '9.5px', background: '#f1f5f9', padding: '1px 5px', borderRadius: '3px', marginLeft: '6px', color: '#334155', fontWeight: '500' }}>
                    GPA/Grade: {e.grade}
                  </span>
                )}
              </div>
              <span style={{ fontSize: '10px', color: '#64748b' }}>
                {e.startYear || e.start_year} – {e.endYear || e.end_year}
              </span>
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Section title="Core Competencies & Skills">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {skills.map((s, i) => {
              const name = typeof s === 'string' ? s : s.name
              const prof = typeof s === 'object' ? s.proficiency : null
              return (
                <span
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid #cbd5e1',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '10px',
                    color: '#1e293b',
                    background: '#f8fafc',
                  }}
                >
                  <span style={{ fontWeight: '500' }}>{name}</span>
                  {prof && <span style={profBadge(prof)}>{prof}</span>}
                </span>
              )
            })}
          </div>
        </Section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <Section title="Key Projects">
          {projects.map((pr, i) => (
            <div key={i} style={{ marginBottom: i === projects.length - 1 ? 0 : '10px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                <strong style={{ fontSize: '11px', color: SECONDARY }}>{pr.title || pr.name}</strong>
                {(pr.techUsed || pr.tech_used) && (
                  <span style={{ fontSize: '10px', color: PRIMARY, fontWeight: '500' }}>
                    [{pr.techUsed || pr.tech_used}]
                  </span>
                )}
                {(pr.projectLink || pr.project_link) && (
                  <span style={{ fontSize: '9.5px', color: '#64748b' }}>
                    🔗 {pr.projectLink || pr.project_link}
                  </span>
                )}
              </div>
              {pr.description && (
                <p style={{ marginTop: '2px', fontSize: '10.5px', lineHeight: '1.5', color: '#475569', margin: '2px 0 0' }}>
                  {pr.description}
                </p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Certifications */}
      {certs.length > 0 && (
        <Section title="Certifications">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '6px' }}>
            {certs.map((c, i) => (
              <div key={i} style={{ fontSize: '10.5px', color: '#334155' }}>
                <strong style={{ color: SECONDARY }}>{c.title}</strong>
                {(c.issuedBy || c.issued_by) && <span> — {c.issuedBy || c.issued_by}</span>}
                {(c.issueDate || c.issue_date) && <span style={{ color: '#64748b', fontSize: '9.5px' }}> ({c.issueDate || c.issue_date})</span>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <Section title="Languages">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {languages.map((l, i) => {
              const name = typeof l === 'string' ? l : l.name
              const prof = typeof l === 'object' ? l.proficiency : null
              return (
                <div key={i} style={{ fontSize: '10.5px', color: '#334155' }}>
                  <strong style={{ color: SECONDARY }}>{name}</strong>
                  {prof && <span style={{ color: '#64748b', fontSize: '10px' }}> ({prof})</span>}
                </div>
              )
            })}
          </div>
        </Section>
      )}
    </div>
  )
}
