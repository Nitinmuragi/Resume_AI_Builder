/* Compact Template — High-density, single-page optimized layout with crisp spacing and ATS linear DOM */
export default function CompactTemplate({ resumeData = {} }) {
  const p = resumeData.personalInfo || {}
  const skills = resumeData.skills || []
  const experience = resumeData.experience || []
  const education = resumeData.education || []
  const projects = resumeData.projects || []
  const certs = resumeData.certifications || []
  const languages = resumeData.languages || []

  const EMERALD = '#047857' // Forest Pine / Emerald
  const DARK = '#0f172a'

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: '12px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: '#f0fdf4',
          borderLeft: `3px solid ${EMERALD}`,
          padding: '2px 8px',
          marginBottom: '6px',
        }}
      >
        <h2
          style={{
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            color: EMERALD,
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
      <div>{children}</div>
    </div>
  )

  const profDotColor = {
    Advanced: '#10b981',
    Intermediate: '#0ea5e9',
    Basic: '#94a3b8',
  }

  return (
    <div
      className="bg-white font-sans"
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        fontSize: '10.5px',
        padding: '26px 32px',
        minHeight: '1056px',
        color: '#1e293b',
        lineHeight: 1.42,
      }}
    >
      {/* Space-efficient Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          borderBottom: `2px solid ${EMERALD}`,
          paddingBottom: '10px',
          marginBottom: '12px',
          gap: '12px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: DARK, margin: 0, letterSpacing: '-0.3px' }}>
            {p.name || 'Your Name'}
          </h1>
          {(resumeData.targetRole || p.title) && (
            <div style={{ fontSize: '11.5px', fontWeight: '600', color: EMERALD, marginTop: '1px' }}>
              {resumeData.targetRole || p.title}
            </div>
          )}
        </div>

        <div style={{ fontSize: '9.5px', color: '#475569', textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div>
            {[p.email, p.phone].filter(Boolean).join(' • ')}
          </div>
          <div>
            {[p.address, p.linkedin, p.github].filter(Boolean).join(' • ')}
          </div>
        </div>
      </div>

      {/* Summary */}
      {resumeData.summary && (
        <Section title="Professional Summary">
          <p style={{ fontSize: '10.5px', lineHeight: '1.45', color: '#334155', margin: 0 }}>
            {resumeData.summary}
          </p>
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Work Experience">
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: i === experience.length - 1 ? 0 : '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div>
                  <strong style={{ fontSize: '11px', color: DARK }}>{e.designation || e.role || e.title}</strong>
                  <span style={{ color: EMERALD, fontWeight: '600', fontSize: '10.5px' }}> | {e.company || e.company_name}</span>
                </div>
                <span style={{ fontSize: '9.5px', color: '#64748b', fontWeight: '500' }}>
                  {e.startDate || e.start_date} – {e.isCurrent || e.is_current ? 'Present' : (e.endDate || e.end_date)}
                </span>
              </div>
              {e.description && (
                <p style={{ marginTop: '2px', fontSize: '10px', lineHeight: '1.4', color: '#475569', margin: '2px 0 0' }}>
                  {e.description}
                </p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <Section title="Key Projects">
          {projects.map((pr, i) => (
            <div key={i} style={{ marginBottom: i === projects.length - 1 ? 0 : '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div>
                  <strong style={{ fontSize: '10.5px', color: DARK }}>{pr.title || pr.name}</strong>
                  {(pr.techUsed || pr.tech_used) && (
                    <span style={{ fontSize: '9.5px', color: EMERALD, fontWeight: '500' }}>
                      {' '}[{pr.techUsed || pr.tech_used}]
                    </span>
                  )}
                </div>
                {(pr.projectLink || pr.project_link) && (
                  <span style={{ fontSize: '9px', color: '#0284c7' }}>
                    {pr.projectLink || pr.project_link}
                  </span>
                )}
              </div>
              {pr.description && (
                <p style={{ marginTop: '1px', fontSize: '10px', lineHeight: '1.4', color: '#475569', margin: '1px 0 0' }}>
                  {pr.description}
                </p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Section title="Technical & Core Skills">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {skills.map((s, i) => {
              const name = typeof s === 'string' ? s : s.name
              const prof = typeof s === 'object' ? s.proficiency : null
              return (
                <span
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    padding: '1px 6px',
                    borderRadius: '3px',
                    fontSize: '9.5px',
                    color: '#1e293b',
                  }}
                >
                  {prof && (
                    <span
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: profDotColor[prof] || '#94a3b8',
                        display: 'inline-block',
                      }}
                    />
                  )}
                  <span style={{ fontWeight: '500' }}>{name}</span>
                </span>
              )
            })}
          </div>
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education">
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: i === education.length - 1 ? 0 : '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <div>
                <strong style={{ fontSize: '10.5px', color: DARK }}>{e.degree}</strong>
                <span style={{ color: '#475569' }}> — {e.institution}</span>
                {e.grade && <span style={{ fontSize: '9px', color: '#64748b' }}> ({e.grade})</span>}
              </div>
              <span style={{ fontSize: '9.5px', color: '#64748b' }}>
                {e.startYear || e.start_year} – {e.endYear || e.end_year}
              </span>
            </div>
          ))}
        </Section>
      )}

      {/* Certifications */}
      {certs.length > 0 && (
        <Section title="Certifications">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
            {certs.map((c, i) => (
              <div key={i} style={{ fontSize: '9.5px', color: '#334155' }}>
                <strong style={{ color: DARK }}>{c.title}</strong>
                {(c.issuedBy || c.issued_by) && <span> — {c.issuedBy || c.issued_by}</span>}
                {(c.issueDate || c.issue_date) && <span style={{ color: '#64748b' }}> ({c.issueDate || c.issue_date})</span>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <Section title="Languages">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            {languages.map((l, i) => {
              const name = typeof l === 'string' ? l : l.name
              const prof = typeof l === 'object' ? l.proficiency : null
              return (
                <div key={i} style={{ fontSize: '9.5px', color: '#334155' }}>
                  <strong style={{ color: DARK }}>{name}</strong>
                  {prof && <span style={{ color: '#64748b' }}> ({prof})</span>}
                </div>
              )
            })}
          </div>
        </Section>
      )}
    </div>
  )
}
