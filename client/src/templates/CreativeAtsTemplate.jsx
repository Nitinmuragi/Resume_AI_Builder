/* Creative-ATS Template — Modern creative visual styling with strict single-column ATS parseable reading order */
export default function CreativeAtsTemplate({ resumeData = {} }) {
  const p = resumeData.personalInfo || {}
  const skills = resumeData.skills || []
  const experience = resumeData.experience || []
  const education = resumeData.education || []
  const projects = resumeData.projects || []
  const certs = resumeData.certifications || []
  const languages = resumeData.languages || []

  const PURPLE = '#7c3aed'
  const INDIGO = '#4f46e5'
  const TEXT_DARK = '#0f172a'

  const Section = ({ title, icon, children }) => (
    <div style={{ marginBottom: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <div
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '6px',
            background: '#f3e8ff',
            color: PURPLE,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: 'bold',
          }}
        >
          {icon}
        </div>
        <h2
          style={{
            fontSize: '12.5px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: PURPLE,
            margin: 0,
          }}
        >
          {title}
        </h2>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #e9d5ff, #f3f4f6)', marginLeft: '6px' }} />
      </div>
      <div>{children}</div>
    </div>
  )

  const profStyle = {
    Advanced: { bg: '#ede9fe', text: '#6d28d9' },
    Intermediate: { bg: '#e0e7ff', text: '#4338ca' },
    Basic: { bg: '#f1f5f9', text: '#475569' },
  }

  return (
    <div
      className="bg-white font-sans"
      style={{
        fontFamily: "'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif",
        fontSize: '11px',
        minHeight: '1056px',
        color: '#334155',
        lineHeight: 1.5,
      }}
    >
      {/* Top Graphic Bar */}
      <div style={{ height: '6px', background: `linear-gradient(90deg, ${PURPLE}, ${INDIGO})` }} />

      <div style={{ padding: '32px 42px' }}>
        {/* Header */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h1 style={{ fontSize: '27px', fontWeight: '800', color: TEXT_DARK, margin: 0, letterSpacing: '-0.4px' }}>
                {p.name || 'Your Name'}
              </h1>
              {(resumeData.targetRole || p.title) && (
                <div style={{ display: 'inline-block', background: '#f5f3ff', color: PURPLE, fontWeight: '600', fontSize: '11.5px', padding: '2px 8px', borderRadius: '4px', marginTop: '4px' }}>
                  {resumeData.targetRole || p.title}
                </div>
              )}
            </div>

            {/* Contact Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxWidth: '380px', justifyContent: 'flex-start' }}>
              {p.email && (
                <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '2px 8px', fontSize: '9.5px' }}>
                  ✉ {p.email}
                </span>
              )}
              {p.phone && (
                <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '2px 8px', fontSize: '9.5px' }}>
                  📞 {p.phone}
                </span>
              )}
              {p.address && (
                <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '2px 8px', fontSize: '9.5px' }}>
                  📍 {p.address}
                </span>
              )}
              {p.linkedin && (
                <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '2px 8px', fontSize: '9.5px' }}>
                  💼 {p.linkedin}
                </span>
              )}
              {p.github && (
                <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '2px 8px', fontSize: '9.5px' }}>
                  💻 {p.github}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        {resumeData.summary && (
          <Section title="About & Professional Profile" icon="✦">
            <p style={{ fontSize: '11px', lineHeight: '1.6', color: '#334155', margin: 0 }}>
              {resumeData.summary}
            </p>
          </Section>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <Section title="Experience" icon="💼">
            {experience.map((e, i) => (
              <div
                key={i}
                style={{
                  marginBottom: i === experience.length - 1 ? 0 : '14px',
                  borderLeft: `2px solid #ede9fe`,
                  paddingLeft: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <div>
                    <strong style={{ fontSize: '11.5px', color: TEXT_DARK }}>{e.designation || e.role || e.title}</strong>
                    <span style={{ color: PURPLE, fontWeight: '600' }}> · {e.company || e.company_name}</span>
                  </div>
                  <span style={{ fontSize: '9.5px', color: '#6b7280', background: '#f3f4f6', padding: '1px 6px', borderRadius: '3px' }}>
                    {e.startDate || e.start_date} – {e.isCurrent || e.is_current ? 'Present' : (e.endDate || e.end_date)}
                  </span>
                </div>
                {e.description && (
                  <p style={{ marginTop: '3px', fontSize: '10.5px', lineHeight: '1.5', color: '#475569', margin: '3px 0 0' }}>
                    {e.description}
                  </p>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <Section title="Featured Projects" icon="🚀">
            {projects.map((pr, i) => (
              <div
                key={i}
                style={{
                  marginBottom: i === projects.length - 1 ? 0 : '10px',
                  borderLeft: `2px solid #ede9fe`,
                  paddingLeft: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <strong style={{ fontSize: '11px', color: TEXT_DARK }}>{pr.title || pr.name}</strong>
                  {(pr.projectLink || pr.project_link) && (
                    <span style={{ fontSize: '9.5px', color: INDIGO }}>
                      {pr.projectLink || pr.project_link}
                    </span>
                  )}
                </div>
                {(pr.techUsed || pr.tech_used) && (
                  <div style={{ fontSize: '9.5px', color: PURPLE, fontWeight: '500', marginTop: '1px' }}>
                    Tech Stack: {pr.techUsed || pr.tech_used}
                  </div>
                )}
                {pr.description && (
                  <p style={{ marginTop: '2px', fontSize: '10.5px', lineHeight: '1.5', color: '#475569', margin: '2px 0 0' }}>
                    {pr.description}
                  </p>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <Section title="Skills & Competencies" icon="⚡">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.map((s, i) => {
                const name = typeof s === 'string' ? s : s.name
                const prof = typeof s === 'object' ? s.proficiency : null
                const badge = profStyle[prof] || profStyle.Intermediate
                return (
                  <span
                    key={i}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: '#faf5ff',
                      border: '1px solid #e9d5ff',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '10px',
                      color: TEXT_DARK,
                    }}
                  >
                    <span style={{ fontWeight: '500' }}>{name}</span>
                    {prof && (
                      <span
                        style={{
                          fontSize: '8.5px',
                          fontWeight: '600',
                          padding: '1px 5px',
                          borderRadius: '4px',
                          marginLeft: '6px',
                          background: badge.bg,
                          color: badge.text,
                        }}
                      >
                        {prof}
                      </span>
                    )}
                  </span>
                )
              })}
            </div>
          </Section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <Section title="Education" icon="🎓">
            {education.map((e, i) => (
              <div key={i} style={{ marginBottom: i === education.length - 1 ? 0 : '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div>
                  <strong style={{ fontSize: '11px', color: TEXT_DARK }}>{e.degree}</strong>
                  <span style={{ color: '#475569' }}> — {e.institution}</span>
                  {e.grade && (
                    <span style={{ fontSize: '9.5px', color: PURPLE, marginLeft: '6px', fontWeight: '500' }}>
                      ({e.grade})
                    </span>
                  )}
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
          <Section title="Certifications" icon="🏆">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '6px' }}>
              {certs.map((c, i) => (
                <div key={i} style={{ fontSize: '10px', color: '#334155' }}>
                  <strong style={{ color: TEXT_DARK }}>{c.title}</strong>
                  {(c.issuedBy || c.issued_by) && <span> — {c.issuedBy || c.issued_by}</span>}
                  {(c.issueDate || c.issue_date) && <span style={{ color: '#64748b', fontSize: '9px' }}> ({c.issueDate || c.issue_date})</span>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <Section title="Languages" icon="🌐">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {languages.map((l, i) => {
                const name = typeof l === 'string' ? l : l.name
                const prof = typeof l === 'object' ? l.proficiency : null
                return (
                  <div key={i} style={{ fontSize: '10px', color: '#334155' }}>
                    <strong style={{ color: TEXT_DARK }}>{name}</strong>
                    {prof && <span style={{ color: PURPLE, marginLeft: '4px' }}>({prof})</span>}
                  </div>
                )
              })}
            </div>
          </Section>
        )}
      </div>
    </div>
  )
}
