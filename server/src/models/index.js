const sequelize = require('../config/db');

const User = require('./User');
const Profile = require('./Profile');
const Skill = require('./Skill');
const UserSkill = require('./UserSkill');
const Language = require('./Language');
const UserLanguage = require('./UserLanguage');
const Education = require('./Education');
const Experience = require('./Experience');
const Project = require('./Project');
const Certification = require('./Certification');
const ResumeTemplate = require('./ResumeTemplate');
const Resume = require('./Resume');
const JobDescription = require('./JobDescription');
const AtsMatchResult = require('./AtsMatchResult');

// ─── Associations ──────────────────────────────────────────────────────────────

// User → Profile (1:1)
User.hasOne(Profile, { foreignKey: 'user_id', as: 'profile', onDelete: 'CASCADE' });
Profile.belongsTo(User, { foreignKey: 'user_id' });

// User → Skills (many-to-many via UserSkill)
User.hasMany(UserSkill, { foreignKey: 'user_id', as: 'userSkills', onDelete: 'CASCADE' });
UserSkill.belongsTo(User, { foreignKey: 'user_id' });
UserSkill.belongsTo(Skill, { foreignKey: 'skill_id', as: 'skill' });
Skill.hasMany(UserSkill, { foreignKey: 'skill_id' });

// User → Languages (many-to-many via UserLanguage)
User.hasMany(UserLanguage, { foreignKey: 'user_id', as: 'userLanguages', onDelete: 'CASCADE' });
UserLanguage.belongsTo(User, { foreignKey: 'user_id' });
UserLanguage.belongsTo(Language, { foreignKey: 'language_id', as: 'language' });
Language.hasMany(UserLanguage, { foreignKey: 'language_id' });

// User → Education
User.hasMany(Education, { foreignKey: 'user_id', as: 'education', onDelete: 'CASCADE' });
Education.belongsTo(User, { foreignKey: 'user_id' });

// User → Experience
User.hasMany(Experience, { foreignKey: 'user_id', as: 'experience', onDelete: 'CASCADE' });
Experience.belongsTo(User, { foreignKey: 'user_id' });

// User → Projects
User.hasMany(Project, { foreignKey: 'user_id', as: 'projects', onDelete: 'CASCADE' });
Project.belongsTo(User, { foreignKey: 'user_id' });

// User → Certifications
User.hasMany(Certification, { foreignKey: 'user_id', as: 'certifications', onDelete: 'CASCADE' });
Certification.belongsTo(User, { foreignKey: 'user_id' });

// User → Resumes
User.hasMany(Resume, { foreignKey: 'user_id', as: 'resumes', onDelete: 'CASCADE' });
Resume.belongsTo(User, { foreignKey: 'user_id' });

// Resume → ResumeTemplate
ResumeTemplate.hasMany(Resume, { foreignKey: 'template_id' });
Resume.belongsTo(ResumeTemplate, { foreignKey: 'template_id', as: 'template' });

// Resume → self (versioning)
Resume.belongsTo(Resume, { foreignKey: 'parent_resume_id', as: 'parentResume', onDelete: 'SET NULL' });

// Resume → AtsMatchResults
Resume.hasMany(AtsMatchResult, { foreignKey: 'resume_id', as: 'atsResults', onDelete: 'CASCADE' });
AtsMatchResult.belongsTo(Resume, { foreignKey: 'resume_id' });

// JobDescription → AtsMatchResults
User.hasMany(JobDescription, { foreignKey: 'user_id', as: 'jobDescriptions', onDelete: 'CASCADE' });
JobDescription.belongsTo(User, { foreignKey: 'user_id' });
JobDescription.hasMany(AtsMatchResult, { foreignKey: 'jd_id', as: 'atsResults', onDelete: 'CASCADE' });
AtsMatchResult.belongsTo(JobDescription, { foreignKey: 'jd_id', as: 'jobDescription' });

// ─── Seed Templates ────────────────────────────────────────────────────────────
async function seedTemplates() {
  const templates = [
    {
      template_name: 'Modern',
      category: 'Modern',
      thumbnail_color: '#1e3a5f',
      thumbnail_url: null,
      layout_config: { columns: 2, headerStyle: 'dark', accentColor: '#1e3a5f' },
    },
    {
      template_name: 'Minimal',
      category: 'Minimal',
      thumbnail_color: '#6b7280',
      thumbnail_url: null,
      layout_config: { columns: 1, headerStyle: 'light', accentColor: '#6b7280' },
    },
    {
      template_name: 'Creative',
      category: 'Creative',
      thumbnail_color: '#0d9488',
      thumbnail_url: null,
      layout_config: { columns: 2, headerStyle: 'sidebar', accentColor: '#0d9488' },
    },
    {
      template_name: 'ATS-Friendly',
      category: 'ATS-Friendly',
      thumbnail_color: '#1d4ed8',
      thumbnail_url: null,
      layout_config: { columns: 1, headerStyle: 'plain', accentColor: '#1d4ed8' },
    },
    {
      template_name: 'Professional',
      category: 'Professional',
      thumbnail_color: '#1e40af',
      thumbnail_url: '/thumbnails/professional.svg',
      layout_config: { columns: 1, headerStyle: 'executive', accentColor: '#1e40af' },
    },
    {
      template_name: 'Academic',
      category: 'Academic',
      thumbnail_color: '#3730a3',
      thumbnail_url: '/thumbnails/academic.svg',
      layout_config: { columns: 1, headerStyle: 'academic', accentColor: '#3730a3' },
    },
    {
      template_name: 'Compact',
      category: 'Compact',
      thumbnail_color: '#047857',
      thumbnail_url: '/thumbnails/compact.svg',
      layout_config: { columns: 2, headerStyle: 'compact', accentColor: '#047857' },
    },
    {
      template_name: 'Creative-ATS',
      category: 'Creative-ATS',
      thumbnail_color: '#7c3aed',
      thumbnail_url: '/thumbnails/creative-ats.svg',
      layout_config: { columns: 1, headerStyle: 'modern-banner', accentColor: '#7c3aed' },
    },
  ];

  for (const t of templates) {
    const existing = await ResumeTemplate.findOne({ where: { template_name: t.template_name } });
    if (!existing) {
      await ResumeTemplate.create(t);
    }
  }

  console.log('✅ Resume templates seeded.');
}

// ─── Seed Skills Master ────────────────────────────────────────────────────────
async function seedSkills() {
  const count = await Skill.count();
  if (count > 0) return;

  const skills = [
    // Programming Languages
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin',
    // Frontend
    'React.js', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'SASS',
    // Backend
    'Node.js', 'Express.js', 'Django', 'Flask', 'FastAPI', 'Spring Boot', 'Laravel', 'Ruby on Rails',
    // Databases
    'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'Cassandra', 'Firebase',
    // DevOps / Cloud
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'CI/CD', 'GitHub Actions', 'Jenkins', 'Linux', 'Nginx',
    // Tools
    'Git', 'GitHub', 'Postman', 'Figma', 'Jira', 'Confluence', 'VS Code',
    // Data Science / ML
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Pandas', 'NumPy', 'Power BI', 'Tableau',
    // Soft Skills
    'Communication', 'Teamwork', 'Problem Solving', 'Leadership', 'Time Management', 'Agile', 'Scrum',
  ];

  await Skill.bulkCreate(skills.map(name => ({ skill_name: name, is_custom: false })));
  console.log(`✅ ${skills.length} skills seeded.`);
}

// ─── Seed Languages Master ─────────────────────────────────────────────────────
async function seedLanguages() {
  const count = await Language.count();
  if (count > 0) return;

  const languages = ['English', 'Hindi', 'Marathi', 'Gujarati', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Punjabi', 'Urdu', 'French', 'German', 'Spanish', 'Japanese', 'Chinese'];
  await Language.bulkCreate(languages.map(name => ({ language_name: name })));
  console.log(`✅ ${languages.length} languages seeded.`);
}

module.exports = {
  sequelize,
  User,
  Profile,
  Skill,
  UserSkill,
  Language,
  UserLanguage,
  Education,
  Experience,
  Project,
  Certification,
  ResumeTemplate,
  Resume,
  JobDescription,
  AtsMatchResult,
  async seedTemplates() {
    await seedTemplates();
    await seedSkills();
    await seedLanguages();
  },
};
