/* Academic Template — Classic CV style with elegant serif typography and rigorous linear ATS structure */
export default function AcademicTemplate({ resumeData = {} }) {
  const p = resumeData.personalInfo || {}
  const skills = resumeData.skills || []
  const experience = resumeData.experience || []
  const education = resumeData.education || []
  const projects = resumeData.projects || []
  const certs = resumeData.certifications || []
  const languages = resumeData.languages || []

  const INK = '#1e1b4b' // Deep Scholarly Indigo
  const SUBINK = '#312e81'

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: '20px' }}>
      <h2
        style={{
          fontFamily: "'Times New Roman', Times, Georgia, serif",
          fontSize: '13px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          color: INK,
          borderBottom: '1px solid #1e1b4b',
          paddingBottom: '3px',
          marginBottom: '10px',
        }}
      >
        {title}
      </h2>
      <div>{children}</div>
    </div>
  )

  return (
    <div
      className="bg-white font-serif"
      style={{
        fontFamily: "'Georgia', 'Times New Roman', Times, serif",
        fontSize: '11px',
        padding: '44px 50px',
        minHeight: '1056px',
        color: '#1f2937',
        lineHeight: 1.55,
      }}
    >
      {/* Centered Academic Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1
          style={{
            fontSize: '25px',
            fontWeight: 'normal',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: INK,
            margin: '0 0 6px',
          }}
        >
          {p.name || 'Your Name'}
        </h1>
        {(resumeData.targetRole || p.title) && (
          <div style={{ fontSize: '12px', fontStyle: 'italic', color: SUBINK, marginBottom: '6px' }}>
            {resumeData.targetRole || p.title}
          </div>
        )}
        <div style={{ fontSize: '10px', color: '#4b5563', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px' }}>
          {[
            p.email ? `✉ ${p.email}` : null,
            p.phone ? `📞 ${p.phone}` : null,
            p.address ? `📍 ${p.address}` : null,
            p.linkedin ? `LinkedIn: ${p.linkedin}` : null,
            p.github ? `Scholar/GitHub: ${p.github}` : null,
          ].filter(Boolean).map((item, idx, arr) => (
            <span key={idx}>
              {item}
              {idx < arr.length - 1 && <span style={{ marginLeft: '8px', color: '#9ca3af' }}>•</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Summary / Research Statement */}
      {resumeData.summary && (
        <Section title="Academic Profile & Research Interests">
          <p style={{ fontSize: '11px', lineHeight: '1.65', color: '#374151', margin: 0, textAlign: 'justify' }}>
            {resumeData.summary}
          </p>
        </Section>
      )}

      {/* Education First (Scholarly standard) */}
      {education.length > 0 && (
        <Section title="Education & Academic Credentials">
          {education.map((e, i) => (
            <div key={i} style={{ marginBottom: i === education.length - 1 ? 0 : '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div>
                  <strong style={{ fontSize: '11.5px', color: INK }}>{e.degree}</strong>
                  <span style={{ fontStyle: 'italic', color: '#374151' }}> — {e.institution}</span>
                </div>
                <span style={{ fontSize: '10px', color: '#6b7280', fontStyle: 'italic' }}>
                  {e.startYear || e.start_year} – {e.endYear || e.end_year}
                </span>
              </div>
              {e.grade && (
                <div style={{ fontSize: '10px', color: '#4b5563', marginTop: '2px' }}>
                  Honors / Performance: {e.grade}
                </div>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Academic / Professional Experience */}
      {experience.length > 0 && (
        <Section title="Professional & Research Experience">
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: i === experience.length - 1 ? 0 : '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <div>
                  <strong style={{ fontSize: '11.5px', color: INK }}>{e.designation || e.role || e.title}</strong>
                  <span style={{ color: '#374151' }}>, {e.company || e.company_name}</span>
                </div>
                <span style={{ fontSize: '10px', color: '#6b7280', fontStyle: 'italic' }}>
                  {e.startDate || e.start_date} – {e.isCurrent || e.is_current ? 'Present' : (e.endDate || e.end_date)}
                </span>
              </div>
              {e.description && (
                <p style={{ marginTop: '3px', fontSize: '10.5px', lineHeight: '1.55', color: '#4b5563', margin: '3px 0 0' }}>
                  {e.description}
                </p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Publications / Projects */}
      {projects.length > 0 && (
        <Section title="Research Projects & Publications">
          {projects.map((pr, i) => (
            <div key={i} style={{ marginBottom: i === projects.length - 1 ? 0 : '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <strong style={{ fontSize: '11px', color: INK }}>{pr.title || pr.name}</strong>
                {(pr.projectLink || pr.project_link) && (
                  <span style={{ fontSize: '9.5px', color: SUBINK }}>
                    {pr.projectLink || pr.project_link}
                  </span>
                )}
              </div>
              {(pr.techUsed || pr.tech_used) && (
                <div style={{ fontSize: '9.5px', fontStyle: 'italic', color: '#6b7280', marginTop: '1px' }}>
                  Methodologies & Technologies: {pr.techUsed || pr.tech_used}
                </div>
              )}
              {pr.description && (
                <p style={{ marginTop: '2px', fontSize: '10.5px', lineHeight: '1.5', color: '#4b5563', margin: '2px 0 0' }}>
                  {pr.description}
                </p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Skills & Methods */}
      {skills.length > 0 && (
        <Section title="Expertise & Methodologies">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '4px 12px' }}>
            {skills.map((s, i) => {
              const name = typeof s === 'string' ? s : s.name
              const prof = typeof s === 'object' ? s.proficiency : null
              return (
                <div key={i} style={{ fontSize: '10.5px', color: '#374151' }}>
                  <span>• {name}</span>
                  {prof && <span style={{ color: '#6b7280', fontSize: '9.5px', fontStyle: 'italic' }}> ({prof})</span>}
                </div>
              )
            })}
          </div>
        </Section>
      )}

      {/* Certifications & Fellowships */}
      {certs.length > 0 && (
        <Section title="Fellowships, Honors & Certifications">
          {certs.map((c, i) => (
            <div key={i} style={{ marginBottom: i === certs.length - 1 ? 0 : '5px', fontSize: '10.5px', color: '#374151' }}>
              <strong style={{ color: INK }}>{c.title}</strong>
              {(c.issuedBy || c.issued_by) && <span> — {c.issuedBy || c.issued_by}</span>}
              {(c.issueDate || c.issue_date) && <span style={{ color: '#6b7280', fontStyle: 'italic' }}> ({c.issueDate || c.issue_date})</span>}
            </div>
          ))}
        </Section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <Section title="Languages & Scholarship">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {languages.map((l, i) => {
              const name = typeof l === 'string' ? l : l.name
              const prof = typeof l === 'object' ? l.proficiency : null
              return (
                <div key={i} style={{ fontSize: '10.5px', color: '#374151' }}>
                  <strong style={{ color: INK }}>{name}</strong>
                  {prof && <span style={{ color: '#6b7280', fontStyle: 'italic' }}>: {prof}</span>}
                </div>
              )
            })}
          </div>
        </Section>
      )}
    </div>
  )
}
