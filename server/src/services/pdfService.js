const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/**
 * Auto-detect an installed browser executable (Chrome / Edge / Chromium)
 */
function getBrowserExecutablePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH && fs.existsSync(process.env.PUPPETEER_EXECUTABLE_PATH)) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  const possiblePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, 'Google\\Chrome\\Application\\chrome.exe') : null,
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean);

  for (const exePath of possiblePaths) {
    if (fs.existsSync(exePath)) {
      return exePath;
    }
  }

  return undefined;
}

/**
 * Renders resume_data as HTML and exports to PDF buffer
 * @param {object} resumeData - The resume JSON data
 * @param {object} template - The template config
 * @returns {Buffer} PDF buffer
 */
async function generatePDF(resumeData, template) {
  const html = buildResumeHTML(resumeData, template);

  const executablePath = getBrowserExecutablePath();
  const launchOptions = {
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  };

  if (executablePath) {
    launchOptions.executablePath = executablePath;
  }

  const browser = await puppeteer.launch(launchOptions);

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('print');

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
    });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
}

/**
 * Builds HTML string for resume based on template category
 */
function buildResumeHTML(resumeData, template) {
  const data = resumeData || {};
  const personal = data.personalInfo || {};
  const accentColor = template?.layout_config?.accentColor || '#1e3a5f';
  const category = template?.category || 'Modern';

  const skillsHtml = Array.isArray(data.skills)
    ? data.skills.map(s => `<span class="skill-chip">${s.name || s} ${s.proficiency ? `(${s.proficiency})` : ''}</span>`).join('')
    : '';

  const experienceHtml = Array.isArray(data.experience)
    ? data.experience.map(e => `
        <div class="section-item">
          <div class="item-header">
            <strong>${e.designation || ''}</strong> at <em>${e.company_name || e.company || ''}</em>
          </div>
          <div class="item-sub">${e.start_date || e.startDate || ''} – ${e.is_current || e.isCurrent ? 'Present' : (e.end_date || e.endDate || '')}</div>
          <p>${e.description || ''}</p>
        </div>`).join('')
    : '';

  const educationHtml = Array.isArray(data.education)
    ? data.education.map(e => `
        <div class="section-item">
          <strong>${e.degree || ''}</strong> — ${e.institution || ''}<br/>
          <span class="item-sub">${e.start_year || ''} – ${e.end_year || ''} ${e.grade ? `| Grade: ${e.grade}` : ''}</span>
        </div>`).join('')
    : '';

  const projectsHtml = Array.isArray(data.projects)
    ? data.projects.map(p => `
        <div class="section-item">
          <strong>${p.title || ''}</strong>
          <p>${p.description || ''}</p>
          ${p.techUsed || p.tech_used ? `<em>Tech: ${p.techUsed || p.tech_used}</em>` : ''}
          ${p.projectLink || p.project_link ? `<a href="${p.projectLink || p.project_link}">${p.projectLink || p.project_link}</a>` : ''}
        </div>`).join('')
    : '';

  const certificationsHtml = Array.isArray(data.certifications)
    ? data.certifications.map(c => `
        <div class="section-item">
          <strong>${c.title || ''}</strong> — ${c.issued_by || c.issuedBy || ''} ${c.issue_date || c.issueDate ? `(${c.issue_date || c.issueDate})` : ''}
        </div>`).join('')
    : '';

  const languagesHtml = Array.isArray(data.languages)
    ? data.languages.map(l => `<span class="skill-chip">${l.name || l} ${l.proficiency ? `(${l.proficiency})` : ''}</span>`).join('')
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${personal.name || 'Resume'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Arial', sans-serif; font-size: 11px; color: #333; background: white; }
    .header { background: ${accentColor}; color: white; padding: 20px 30px; }
    .header h1 { font-size: 24px; margin-bottom: 4px; }
    .header .contact { font-size: 10px; opacity: 0.9; }
    .header .contact span { margin-right: 15px; }
    .container { padding: 20px 30px; }
    .section { margin-bottom: 16px; }
    .section-title { font-size: 13px; font-weight: bold; color: ${accentColor}; text-transform: uppercase;
      border-bottom: 2px solid ${accentColor}; padding-bottom: 4px; margin-bottom: 10px; letter-spacing: 1px; }
    .section-item { margin-bottom: 10px; }
    .item-header { font-size: 11px; }
    .item-sub { font-size: 10px; color: #666; margin: 2px 0 4px; }
    p { font-size: 10.5px; line-height: 1.5; color: #444; }
    .skill-chip { display: inline-block; background: #f0f4ff; border: 1px solid ${accentColor}33;
      color: #333; padding: 2px 8px; border-radius: 10px; font-size: 9.5px; margin: 2px; }
    a { color: ${accentColor}; font-size: 9.5px; }
    em { color: #555; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${personal.name || 'Your Name'}</h1>
    <div class="contact">
      ${personal.email ? `<span>✉ ${personal.email}</span>` : ''}
      ${personal.phone ? `<span>📞 ${personal.phone}</span>` : ''}
      ${personal.address ? `<span>📍 ${personal.address}</span>` : ''}
      ${personal.linkedin ? `<span>LinkedIn: ${personal.linkedin}</span>` : ''}
      ${personal.github ? `<span>GitHub: ${personal.github}</span>` : ''}
    </div>
  </div>
  <div class="container">
    ${data.summary ? `<div class="section"><div class="section-title">Summary</div><p>${data.summary}</p></div>` : ''}
    ${skillsHtml ? `<div class="section"><div class="section-title">Skills</div>${skillsHtml}</div>` : ''}
    ${experienceHtml ? `<div class="section"><div class="section-title">Experience</div>${experienceHtml}</div>` : ''}
    ${educationHtml ? `<div class="section"><div class="section-title">Education</div>${educationHtml}</div>` : ''}
    ${projectsHtml ? `<div class="section"><div class="section-title">Projects</div>${projectsHtml}</div>` : ''}
    ${certificationsHtml ? `<div class="section"><div class="section-title">Certifications</div>${certificationsHtml}</div>` : ''}
    ${languagesHtml ? `<div class="section"><div class="section-title">Languages</div>${languagesHtml}</div>` : ''}
  </div>
</body>
</html>`;
}

module.exports = { generatePDF };
