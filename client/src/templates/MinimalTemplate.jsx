/* Minimal Template — Clean single-column, elegant typography */
export default function MinimalTemplate({ resumeData = {} }) {
  const p = resumeData.personalInfo || {}
  const skills = resumeData.skills || []
  const experience = resumeData.experience || []
  const education = resumeData.education || []
  const projects = resumeData.projects || []
  const certs = resumeData.certifications || []
  const languages = resumeData.languages || []

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: '22px' }}>
      <h2 style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', color: '#6b7280', marginBottom: '10px' }}>{title}</h2>
      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '10px' }}>{children}</div>
    </div>
  )

  return (
    <div style={{ background: 'white', fontFamily: 'Georgia, serif', fontSize: '12px', padding: '48px 52px', minHeight: '1056px', color: '#1f2937' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px', borderBottom: '2px solid #1f2937', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'normal', letterSpacing: '3px', textTransform: 'uppercase', margin: 0 }}>{p.name || 'Your Name'}</h1>
        <div style={{ marginTop: '10px', fontSize: '10px', color: '#6b7280', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.address && <span>{p.address}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
        </div>
      </div>

      {resumeData.summary && (
        <Section title="Profile">
          <p style={{ lineHeight: '1.7', color: '#374151', fontSize: '11.5px', fontStyle: 'italic' }}>{resumeData.summary}</p>
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold' }}>{e.designation} — {e.company || e.company_name}</span>
                <span style={{ fontSize: '10px', color: '#9ca3af' }}>{e.startDate} – {e.isCurrent ? 'Present' : e.endDate}</span>
              </div>
              <p style={{ marginTop: '4px', fontSize: '11px', lineHeight: '1.6', color: '#4b5563' }}>{e.description}</p>
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontWeight: 'bold' }}>{e.degree}</span>, {e.institution}
                {e.grade && <span style={{ fontSize: '10px', color: '#6b7280' }}> · {e.grade}</span>}
              </div>
              <span style={{ fontSize: '10px', color: '#9ca3af' }}>{e.startYear} – {e.endYear}</span>
            </div>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ border: '1px solid #d1d5db', padding: '3px 10px', borderRadius: '4px', fontSize: '10.5px', color: '#374151' }}>
                {s.name}
              </span>
            ))}
          </div>
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '11.5px' }}>{p.title}</span>
              {p.techUsed && <span style={{ fontSize: '10px', color: '#6b7280' }}> · {p.techUsed}</span>}
              <p style={{ marginTop: '3px', fontSize: '11px', lineHeight: '1.5', color: '#4b5563' }}>{p.description}</p>
            </div>
          ))}
        </Section>
      )}

      {languages.length > 0 && (
        <Section title="Languages">
          <div style={{ display: 'flex', gap: '20px' }}>
            {languages.map((l, i) => (
              <span key={i} style={{ fontSize: '11px' }}>{l.name} <span style={{ color: '#6b7280' }}>({l.proficiency})</span></span>
            ))}
          </div>
        </Section>
      )}

      {certs.length > 0 && (
        <Section title="Certifications">
          {certs.map((c, i) => (
            <div key={i} style={{ marginBottom: '4px', fontSize: '11px' }}>
              <strong>{c.title}</strong> — {c.issuedBy} {c.issueDate && `(${c.issueDate})`}
            </div>
          ))}
        </Section>
      )}
    </div>
  )
}
