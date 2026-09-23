/* ATS-Friendly Template — Single column, no fancy styling, maximum ATS parsability */
export default function AtsFriendlyTemplate({ resumeData = {} }) {
  const p = resumeData.personalInfo || {}
  const skills = resumeData.skills || []
  const experience = resumeData.experience || []
  const education = resumeData.education || []
  const projects = resumeData.projects || []
  const certs = resumeData.certifications || []
  const languages = resumeData.languages || []

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: '16px' }}>
      <h2 style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '2px solid #1d4ed8', paddingBottom: '4px', marginBottom: '10px', color: '#1d4ed8', letterSpacing: '0.5px' }}>{title}</h2>
      {children}
    </div>
  )

  return (
    <div style={{ background: 'white', fontFamily: 'Arial, sans-serif', fontSize: '11.5px', padding: '36px 44px', minHeight: '1056px', color: '#111827' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 6px', color: '#111827' }}>{p.name || 'Your Name'}</h1>
        <div style={{ fontSize: '10.5px', color: '#374151' }}>
          {[p.email, p.phone, p.address, p.linkedin, p.github].filter(Boolean).join(' | ')}
        </div>
      </div>

      {resumeData.summary && (
        <Section title="Professional Summary">
          <p style={{ fontSize: '11px', lineHeight: '1.6' }}>{resumeData.summary}</p>
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills">
          <p style={{ fontSize: '11px', lineHeight: '1.7' }}>
            {skills.map(s => `${s.name} (${s.proficiency})`).join(' • ')}
          </p>
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Work Experience">
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{e.designation}, {e.company || e.company_name}</strong>
                <span style={{ fontSize: '10px', color: '#6b7280' }}>{e.startDate} – {e.isCurrent ? 'Present' : e.endDate}</span>
              </div>
              <p style={{ marginTop: '5px', fontSize: '11px', lineHeight: '1.6', color: '#374151' }}>{e.description}</p>
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>{e.degree}</strong> — {e.institution}
                {e.grade && <span style={{ color: '#6b7280', fontSize: '10.5px' }}> | {e.grade}</span>}
              </div>
              <span style={{ fontSize: '10px', color: '#6b7280' }}>{e.startYear} – {e.endYear}</span>
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <strong>{p.title}</strong>
              {p.techUsed && <span style={{ fontSize: '10.5px', color: '#374151' }}> | Tech: {p.techUsed}</span>}
              <p style={{ marginTop: '3px', fontSize: '11px', lineHeight: '1.5', color: '#374151' }}>{p.description}</p>
            </div>
          ))}
        </Section>
      )}

      {certs.length > 0 && (
        <Section title="Certifications">
          {certs.map((c, i) => (
            <div key={i} style={{ marginBottom: '4px', fontSize: '11px' }}>
              {c.title} — {c.issuedBy} {c.issueDate && `(${c.issueDate})`}
            </div>
          ))}
        </Section>
      )}

      {languages.length > 0 && (
        <Section title="Languages">
          <p style={{ fontSize: '11px' }}>
            {languages.map(l => `${l.name} (${l.proficiency})`).join(' | ')}
          </p>
        </Section>
      )}
    </div>
  )
}
