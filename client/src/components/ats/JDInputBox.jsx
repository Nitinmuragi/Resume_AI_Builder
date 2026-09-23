export default function JDInputBox({ value, onChange }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Paste Job Description
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={10}
        placeholder="Paste the full job description here...&#10;&#10;Example:&#10;We are looking for a Senior Software Engineer with 5+ years of experience in React.js, Node.js, and MySQL. The candidate should have strong knowledge of REST APIs, Docker, and Agile methodologies..."
        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y font-mono leading-relaxed"
      />
      <p className="text-xs text-gray-400 mt-1.5">{value.length} characters</p>
    </div>
  )
}
