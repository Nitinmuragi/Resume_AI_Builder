export default function MatchScoreCard({ score }) {
  const pct = Math.min(Math.max(score, 0), 100)
  const color = pct >= 70 ? '#10b981' : pct >= 40 ? '#f59e0b' : '#ef4444'
  const label = pct >= 70 ? 'Excellent' : pct >= 40 ? 'Fair' : 'Poor'
  const circumference = 2 * Math.PI * 54

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
      <h3 className="font-semibold text-gray-800 mb-4 text-sm">ATS Match Score</h3>

      {/* SVG gauge */}
      <div className="relative inline-flex items-center justify-center mb-4">
        <svg width="140" height="140" viewBox="0 0 140 140">
          {/* Background circle */}
          <circle cx="70" cy="70" r="54" fill="none" stroke="#e5e7eb" strokeWidth="12" />
          {/* Progress circle */}
          <circle
            cx="70" cy="70" r="54" fill="none"
            stroke={color} strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - pct / 100)}
            strokeLinecap="round"
            transform="rotate(-90 70 70)"
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold" style={{ color }}>{pct.toFixed(0)}%</span>
          <span className="text-xs font-medium text-gray-500">{label}</span>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        {pct >= 70
          ? '🎉 Great match! Your resume is well-optimized for this job.'
          : pct >= 40
          ? '⚠️ Moderate match. Add some missing keywords to improve.'
          : '❗ Low match. Significant keyword gaps found.'}
      </p>
    </div>
  )
}
