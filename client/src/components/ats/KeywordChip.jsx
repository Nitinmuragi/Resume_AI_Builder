export default function KeywordChip({ label, type = 'matched' }) {
  const styles = {
    matched: 'bg-green-50 text-green-700 border-green-200',
    missing: 'bg-red-50 text-red-700 border-red-200',
    neutral: 'bg-gray-100 text-gray-700 border-gray-200',
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[type]}`}>
      {type === 'matched' && '✓ '}
      {type === 'missing' && '✗ '}
      {label}
    </span>
  )
}
