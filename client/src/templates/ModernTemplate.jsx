/* Modern Template — Dark blue header, two-column layout */
export default function ModernTemplate({ resumeData = {} }) {
  const p = resumeData.personalInfo || {}
  const skills = resumeData.skills || []
  const experience = resumeData.experience || []
  const education = resumeData.education || []
  const projects = resumeData.projects || []
  const certs = resumeData.certifications || []
  const languages = resumeData.languages || []

  const profColor = { Basic: '#fbbf24', Intermediate: '#60a5fa', Advanced: '#34d399' }

  return (
    <div className="bg-white font-sans" style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', minHeight: '1056px' }}>
      {/* Header */}
      <div style={{ background: '#1e3a5f', color: 'white', padding: '28px 32px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: 0 }}>{p.name || 'Your Name'}</h1>
        <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '11px', opacity: 0.85 }}>
          {p.email && <span>✉ {p.email}</span>}
          {p.phone && <span>📞 {p.phone}</span>}
          {p.address && <span>📍 {p.address}</span>}
          {p.linkedin && <span>in {p.linkedin}</span>}
          {p.github && <span>⌥ {p.github}</span>}
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        {/* Left sidebar */}
        <div style={{ width: '33%', background: '#f1f5f9', padding: '20px 16px', minHeight: '900px' }}>
          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#1e3a5f', borderBottom: '2px solid #1e3a5f', paddingBottom: '4px', marginBottom: '10px' }}>Skills</h2>
              {skills.map((s, i) => (
                <div key={i} style={{ marginBottom: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px' }}>{s.name}</span>
                    <span style={{ fontSize: '9px', padding: '1px 6px', borderRadius: '8px', background: profColor[s.proficiency] || '#e5e7eb', color: '#1f2937' }}>{s.proficiency}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#1e3a5f', borderBottom: '2px solid #1e3a5f', paddingBottom: '4px', marginBottom: '10px' }}>Languages</h2>
              {languages.map((l, i) => (
                <div key={i} style={{ marginBottom: '4px', fontSize: '11px' }}>{l.name} <span style={{ color: '#6b7280', fontSize: '10px' }}>({l.proficiency})</span></div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#1e3a5f', borderBottom: '2px solid #1e3a5f', paddingBottom: '4px', marginBottom: '10px' }}>Education</h2>
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{e.degree}</div>
                  <div style={{ fontSize: '10px', color: '#475569' }}>{e.institution}</div>
                  <div style={{ fontSize: '9px', color: '#94a3b8' }}>{e.startYear} – {e.endYear} {e.grade && `| ${e.grade}`}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right main content */}
        <div style={{ flex: 1, padding: '20px 24px' }}>
          {/* Summary */}
          {resumeData.summary && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#1e3a5f', borderBottom: '2px solid #1e3a5f', paddingBottom: '4px', marginBottom: '8px' }}>Summary</h2>
              <p style={{ fontSize: '11px', lineHeight: '1.6', color: '#374151' }}>{resumeData.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#1e3a5f', borderBottom: '2px solid #1e3a5f', paddingBottom: '4px', marginBottom: '10px' }}>Experience</h2>
              {experience.map((e, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontWeight: 'bold', fontSize: '12px' }}>{e.designation}</span>
                      <span style={{ color: '#6b7280', fontSize: '11px' }}> at {e.company || e.company_name}</span>
                    </div>
                    <span style={{ fontSize: '10px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {e.startDate} – {e.isCurrent ? 'Present' : e.endDate}
                    </span>
                  </div>
                  <p style={{ marginTop: '4px', fontSize: '11px', lineHeight: '1.5', color: '#4b5563' }}>{e.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#1e3a5f', borderBottom: '2px solid #1e3a5f', paddingBottom: '4px', marginBottom: '10px' }}>Projects</h2>
              {projects.map((p, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{p.title}</div>
                  {p.techUsed && <div style={{ fontSize: '10px', color: '#2563eb', marginTop: '2px' }}>Tech: {p.techUsed}</div>}
                  <p style={{ marginTop: '3px', fontSize: '11px', lineHeight: '1.5', color: '#4b5563' }}>{p.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certs.length > 0 && (
            <div>
              <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#1e3a5f', borderBottom: '2px solid #1e3a5f', paddingBottom: '4px', marginBottom: '10px' }}>Certifications</h2>
              {certs.map((c, i) => (
                <div key={i} style={{ marginBottom: '6px', fontSize: '11px' }}>
                  <strong>{c.title}</strong> — {c.issuedBy} {c.issueDate && `(${c.issueDate})`}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
