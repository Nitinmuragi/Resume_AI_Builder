import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  FiFileText,
  FiTarget,
  FiDownload,
  FiCheckCircle,
  FiArrowRight,
  FiLayers,
  FiZap,
  FiAward,
  FiCheck,
  FiMenu,
  FiX,
  FiShield,
  FiTrendingUp,
} from 'react-icons/fi'

export default function LandingPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleCtaClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      navigate('/register')
    }
  }

  const templates = [
    {
      name: 'Modern',
      category: 'Corporate & Tech',
      color: '#1e3a5f',
      description: 'Two-column layout with a deep navy header. Clean, balanced, and authoritative.',
      tags: ['Top Pick', 'Engineering', 'Product'],
    },
    {
      name: 'Minimal',
      category: 'Clean & Elegant',
      color: '#4b5563',
      description: 'Single-column structure with subtle borders and crisp typography. Distraction-free.',
      tags: ['Executive', 'Finance', 'Design'],
    },
    {
      name: 'Creative',
      category: 'Contemporary',
      color: '#0d9488',
      description: 'Teal accent sidebar with highlighted skills and achievements. Stands out in the pile.',
      tags: ['Marketing', 'Media', 'Startups'],
    },
    {
      name: 'ATS-Friendly',
      category: 'Optimized Parser',
      color: '#1d4ed8',
      description: 'Pure, strict standard single-column format built specifically for automated scanners.',
      tags: ['100% Parsable', 'Enterprise', 'All Roles'],
    },
  ]

  const features = [
    {
      icon: <FiTarget size={24} className="text-blue-600" />,
      title: 'AI ATS Keyword Matcher',
      description:
        'Paste any job description to instantly analyze keyword matches. See exactly what skills and certifications you are missing before you apply.',
    },
    {
      icon: <FiLayers size={24} className="text-indigo-600" />,
      title: 'Recruiter-Approved Templates',
      description:
        'Switch between multiple professional templates with a single click. Keep your content intact while changing visual aesthetics instantly.',
    },
    {
      icon: <FiZap size={24} className="text-amber-500" />,
      title: 'Live Real-Time Preview',
      description:
        'Edit section by section and watch your document update in real time. Full control over personal details, experience, projects, and education.',
    },
    {
      icon: <FiDownload size={24} className="text-emerald-600" />,
      title: 'High-Resolution PDF Export',
      description:
        'Generate pixel-perfect, printer-ready A4 PDFs with vector text quality. Engineered so corporate ATS scanners extract your data cleanly.',
    },
  ]

  const steps = [
    {
      number: '01',
      title: 'Fill Your Details',
      desc: 'Add your skills, work history, projects, and achievements using our intuitive section editor.',
    },
    {
      number: '02',
      title: 'Match Against Job Postings',
      desc: 'Compare your resume with the target job description to get a live ATS compatibility score.',
    },
    {
      number: '03',
      title: 'Download & Get Hired',
      desc: 'Export your optimized, recruiter-ready PDF in one click and start landing interviews.',
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-700">
      {/* ────────────────── Header / Navbar ────────────────── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-xl p-2 shadow-sm shadow-blue-500/20">
              <FiFileText size={20} />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-gray-900">
              Resume<span className="text-blue-600">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#templates" className="hover:text-blue-600 transition-colors">
              Templates
            </a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
              How It Works
            </a>
            <a href="#ats-info" className="hover:text-blue-600 transition-colors">
              ATS Checker
            </a>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm shadow-blue-600/20 active:scale-95"
              >
                Go to Dashboard
                <FiArrowRight size={15} />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-600 px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm shadow-blue-600/20 active:scale-95"
                >
                  Get Started Free
                  <FiArrowRight size={15} />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-gray-100 bg-white px-4 py-4 space-y-3">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 py-1.5"
            >
              Features
            </a>
            <a
              href="#templates"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 py-1.5"
            >
              Templates
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 py-1.5"
            >
              How It Works
            </a>
            <a
              href="#ats-info"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-700 py-1.5"
            >
              ATS Checker
            </a>
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="w-full text-center bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full text-center border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="w-full text-center bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ────────────────── Hero Section ────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 bg-gradient-to-b from-blue-50/60 via-white to-white">
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-400/15 to-indigo-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs sm:text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Smart ATS Resume Builder · 100% Free</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
              Build Job-Winning,{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                ATS-Optimized Resumes
              </span>{' '}
              in Minutes
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Never get filtered out by automated hiring systems again. Craft recruiter-approved
              resumes, analyze job descriptions with real-time keyword matching, and download
              clean vector PDFs instantly.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={handleCtaClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 active:scale-95 text-base"
              >
                Create My Resume
                <FiArrowRight size={18} />
              </button>
              <Link
                to={isAuthenticated ? '/ats-check' : '/login'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-base"
              >
                <FiTarget size={18} className="text-blue-600" />
                Check ATS Score
              </Link>
            </div>

            {/* Trust points */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <FiCheck className="text-emerald-500 stroke-[3]" /> No Credit Card Required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FiCheck className="text-emerald-500 stroke-[3]" /> Real-Time Scoring
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FiCheck className="text-emerald-500 stroke-[3]" /> 1-Click PDF Download
              </span>
            </div>
          </div>

          {/* Interactive Floating Preview Mockup */}
          <div className="mt-14 max-w-4xl mx-auto relative">
            <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-2 sm:p-4 shadow-2xl ring-1 ring-white/10">
              <div className="bg-white rounded-xl overflow-hidden shadow-inner border border-gray-100">
                {/* Browser bar */}
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-2.5 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="mx-auto bg-white border border-gray-200 rounded-md px-4 py-0.5 text-[11px] text-gray-400">
                    resumeai.app/builder/preview
                  </div>
                </div>

                {/* Simulated Resume Preview */}
                <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl">
                      JD
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">John Doe</h4>
                      <p className="text-xs text-blue-600 font-medium">Senior Software Engineer</p>
                    </div>
                    <div className="space-y-1.5 text-[11px] text-gray-500">
                      <p>✉ john.doe@example.com</p>
                      <p>📞 +1 (555) 019-2834</p>
                      <p>📍 San Francisco, CA</p>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                        Key Skills
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {['React', 'Node.js', 'TypeScript', 'MySQL', 'Tailwind', 'AWS'].map((s) => (
                          <span
                            key={s}
                            className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right 2 Columns */}
                  <div className="md:col-span-2 space-y-4 text-left">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">
                        Professional Summary
                      </span>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        Full-stack developer with 5+ years of experience designing and scaling web
                        architectures. Specialized in high-performance applications, ATS-friendly
                        tooling, and clean software design.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">
                        Experience
                      </span>
                      <div className="mt-2 space-y-3">
                        <div>
                          <div className="flex justify-between items-baseline">
                            <span className="text-xs font-bold text-gray-800">
                              Tech Lead · Apex Cloud
                            </span>
                            <span className="text-[10px] text-gray-400">2022 — Present</span>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            Spearheaded cloud migration improving response latency by 38% and
                            serving 500k+ daily requests.
                          </p>
                        </div>
                        <div>
                          <div className="flex justify-between items-baseline">
                            <span className="text-xs font-bold text-gray-800">
                              Software Engineer · InnoSoft
                            </span>
                            <span className="text-[10px] text-gray-400">2019 — 2022</span>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            Developed automated CI/CD pipelines and built React UI dashboards
                            handling real-time analytics.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating ATS Badge */}
            <div className="absolute -top-4 -right-2 sm:-right-6 bg-white border border-emerald-200 shadow-xl rounded-2xl p-3 sm:p-4 flex items-center gap-3 animate-bounce [animation-duration:3s]">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-extrabold text-sm sm:text-base shadow-md shadow-emerald-500/30">
                94%
              </div>
              <div className="text-left pr-2">
                <span className="block text-[11px] text-gray-500 font-medium">ATS Match Score</span>
                <span className="block text-xs sm:text-sm font-bold text-emerald-600">
                  Ready to Apply ✓
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── Key Features ────────────────── */}
      <section id="features" className="py-20 bg-gray-50 border-y border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600">
              Why ResumeAI
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Everything You Need to Pass the Automated Screeners
            </p>
            <p className="mt-4 text-gray-600 text-sm sm:text-base">
              75% of resumes are rejected by ATS algorithms before a human recruiter even sees them.
              ResumeAI fixes that.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-5">
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── Template Showcase ────────────────── */}
      <section id="templates" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600">
              Templates
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Designed for Readability, Tested for ATS
            </p>
            <p className="mt-4 text-gray-600 text-sm sm:text-base">
              Each template is calibrated for standard typography, proper heading hierarchy, and
              flawless PDF parsing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((tmpl, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group"
              >
                {/* Visual Header */}
                <div
                  className="h-44 flex flex-col items-center justify-center relative p-4"
                  style={{
                    background: `linear-gradient(135deg, ${tmpl.color}ee, ${tmpl.color}99)`,
                  }}
                >
                  <div className="w-32 bg-white/20 backdrop-blur-sm rounded-lg p-2.5 space-y-1.5 shadow-sm">
                    <div className="h-2 bg-white/90 rounded w-3/4 mx-auto" />
                    <div className="h-1 bg-white/70 rounded w-1/2 mx-auto" />
                    <div className="border-t border-white/30 pt-1.5 space-y-1">
                      <div className="h-1 bg-white/50 rounded" />
                      <div className="h-1 bg-white/50 rounded w-4/5" />
                      <div className="h-1 bg-white/50 rounded w-3/5" />
                    </div>
                  </div>
                  <span className="absolute top-3 right-3 bg-white/25 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {tmpl.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{tmpl.name}</h3>
                  <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                    {tmpl.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {tmpl.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={handleCtaClick}
                    className="w-full flex items-center justify-center gap-1.5 bg-blue-50 text-blue-700 py-2 rounded-xl text-xs font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    Use This Template
                    <FiArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── How It Works ────────────────── */}
      <section id="how-it-works" className="py-20 bg-gray-50 border-y border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600">
              Workflow
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Create Your Resume in 3 Simple Steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((st, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm relative"
              >
                <span className="text-4xl font-black text-blue-600/20 block mb-4 font-mono">
                  {st.number}
                </span>
                <h3 className="font-bold text-gray-900 text-xl mb-2">{st.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── ATS Checker Highlight ────────────────── */}
      <section id="ats-info" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl relative z-10 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold mb-6">
                <FiTarget size={14} /> Built-in ATS Intelligence
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Stop guessing what recruiters want.
              </h2>
              <p className="mt-4 text-blue-100/90 text-sm sm:text-base leading-relaxed">
                Our NLP keyword engine extracts hard skills, designations, and industry keywords
                from the exact job description you are targeting. It highlights what matches and
                gives you the exact list of missing keywords to add.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleCtaClick}
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-950 px-7 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all text-sm shadow-md"
                >
                  Start Building Free
                  <FiArrowRight size={16} />
                </button>
                <Link
                  to={isAuthenticated ? '/ats-check' : '/login'}
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-7 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors text-sm"
                >
                  Try ATS Matcher
                </Link>
              </div>
            </div>

            {/* Decorative background circle */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ────────────────── Footer ────────────────── */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white rounded-lg p-1.5">
                <FiFileText size={18} />
              </div>
              <span className="font-bold text-white text-lg">
                Resume<span className="text-blue-500">AI</span>
              </span>
            </div>

            <p className="text-xs text-gray-500 text-center">
              © {new Date().getFullYear()} ResumeAI. All rights reserved. Built for job seekers
              everywhere.
            </p>

            <div className="flex items-center gap-4 text-xs">
              <Link to="/login" className="hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="hover:text-white transition-colors">
                Register
              </Link>
              <a href="#features" className="hover:text-white transition-colors">
                Features
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
