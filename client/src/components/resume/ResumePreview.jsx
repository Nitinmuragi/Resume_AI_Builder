import ModernTemplate from '../../templates/ModernTemplate'
import MinimalTemplate from '../../templates/MinimalTemplate'
import CreativeTemplate from '../../templates/CreativeTemplate'
import AtsFriendlyTemplate from '../../templates/AtsFriendlyTemplate'
import ProfessionalTemplate from '../../templates/ProfessionalTemplate'
import AcademicTemplate from '../../templates/AcademicTemplate'
import CompactTemplate from '../../templates/CompactTemplate'
import CreativeAtsTemplate from '../../templates/CreativeAtsTemplate'

const TEMPLATE_MAP = {
  Modern: ModernTemplate,
  Minimal: MinimalTemplate,
  Creative: CreativeTemplate,
  'ATS-Friendly': AtsFriendlyTemplate,
  Professional: ProfessionalTemplate,
  Academic: AcademicTemplate,
  Compact: CompactTemplate,
  'Creative-ATS': CreativeAtsTemplate,
}

export default function ResumePreview({ resumeData, template, id = 'resume-preview-document' }) {
  const name = template?.template_name || 'Modern'
  const TemplateComponent = TEMPLATE_MAP[name] || ModernTemplate

  return (
    <div className="shadow-lg rounded-lg overflow-hidden" style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}>
      <div id={id} style={{ background: '#ffffff', minHeight: '1056px' }}>
        <TemplateComponent resumeData={resumeData} />
      </div>
    </div>
  )
}
