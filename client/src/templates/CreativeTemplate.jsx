/* Creative Template — Teal sidebar with coral accents */
export default function CreativeTemplate({ resumeData = {} }) {
  const p = resumeData.personalInfo || {}
  const skills = resumeData.skills || []
  const experience = resumeData.experience || []
  const education = resumeData.education || []
  const projects = resumeData.projects || []
  const certs = resumeData.certifications || []
  const languages = resumeData.languages || []

  const TEAL = '#0d9488'
  const CORAL = '#f97316'

  return (
    <div style={{ background: 'white', fontFamily: 'Arial, sans-serif', fontSize: '11px', display: 'flex', minHeight: '1056px' }}>
      {/* Sidebar */}
      <div style={{ width: '35%', background: TEAL, color: 'white', padding: '32px 20px' }}>
        {/* Avatar placeholder */}
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
          {p.name ? p.name[0].toUpperCase() : '?'}
        </div>
        <h1 style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', margin: '0 0 4px' }}>{p.name || 'Your Name'}</h1>
        <p style={{ textAlign: 'center', fontSize: '10px', opacity: 0.8, marginBottom: '24px' }}>{resumeData.targetRole || ''}</p>

        {/* Contact */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.7, marginBottom: '8px' }}>Contact</h3>
          {p.email && <div style={{ fontSize: '10px', marginBottom: '4px' }}>✉ {p.email}</div>}
          {p.phone && <div style={{ fontSize: '10px', marginBottom: '4px' }}>📞 {p.phone}</div>}
          {p.address && <div style={{ fontSize: '10px', marginBottom: '4px' }}>📍 {p.address}</div>}
          {p.linkedin && <div style={{ fontSize: '10px', marginBottom: '4px' }}>in {p.linkedin}</div>}
          {p.github && <div style={{ fontSize: '10px', marginBottom: '4px' }}>⌥ {p.github}</div>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.7, marginBottom: '10px' }}>Skills</h3>
            {skills.map((s, i) => (
              <div key={i} style={{ marginBottom: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ fontSize: '10px' }}>{s.name}</span>
                  <span style={{ fontSize: '9px', opacity: 0.7 }}>{s.proficiency}</span>
                </div>
                <div style={{ height: '3px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                  <div style={{ height: '100%', borderRadius: '2px', background: CORAL, width: s.proficiency === 'Advanced' ? '100%' : s.proficiency === 'Intermediate' ? '66%' : '33%', transition: 'width 0.5s' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.7, marginBottom: '8px' }}>Languages</h3>
            {languages.map((l, i) => (
              <div key={i} style={{ fontSize: '10px', marginBottom: '3px' }}>{l.name} · {l.proficiency}</div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.7, marginBottom: '8px' }}>Education</h3>
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '10.5px' }}>{e.degree}</div>
                <div style={{ fontSize: '10px', opacity: 0.85 }}>{e.institution}</div>
                <div style={{ fontSize: '9px', opacity: 0.65 }}>{e.startYear} – {e.endYear}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px 28px', background: '#fafafa' }}>
        {resumeData.summary && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: TEAL, borderLeft: `3px solid ${CORAL}`, paddingLeft: '10px', marginBottom: '8px' }}>About Me</h2>
            <p style={{ fontSize: '11px', lineHeight: '1.6', color: '#374151' }}>{resumeData.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: TEAL, borderLeft: `3px solid ${CORAL}`, paddingLeft: '10px', marginBottom: '12px' }}>Experience</h2>
            {experience.map((e, i) => (
              <div key={i} style={{ marginBottom: '14px', paddingLeft: '12px', borderLeft: '2px solid #e5e7eb' }}>
                <div style={{ fontWeight: 'bold', color: '#1f2937' }}>{e.designation}</div>
                <div style={{ color: CORAL, fontSize: '10px', fontWeight: '600' }}>{e.company || e.company_name}</div>
                <div style={{ fontSize: '9px', color: '#9ca3af', marginBottom: '4px' }}>{e.startDate} – {e.isCurrent ? 'Present' : e.endDate}</div>
                <p style={{ fontSize: '10.5px', lineHeight: '1.5', color: '#4b5563' }}>{e.description}</p>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: TEAL, borderLeft: `3px solid ${CORAL}`, paddingLeft: '10px', marginBottom: '12px' }}>Projects</h2>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <div style={{ fontWeight: 'bold', color: '#1f2937' }}>{p.title}</div>
                {p.techUsed && <div style={{ fontSize: '10px', color: TEAL }}>🔧 {p.techUsed}</div>}
                <p style={{ fontSize: '10.5px', lineHeight: '1.5', color: '#4b5563', marginTop: '3px' }}>{p.description}</p>
              </div>
            ))}
          </div>
        )}

        {certs.length > 0 && (
          <div>
            <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: TEAL, borderLeft: `3px solid ${CORAL}`, paddingLeft: '10px', marginBottom: '10px' }}>Certifications</h2>
            {certs.map((c, i) => (
              <div key={i} style={{ marginBottom: '6px', fontSize: '11px' }}>
                🏅 <strong>{c.title}</strong> — {c.issuedBy}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
