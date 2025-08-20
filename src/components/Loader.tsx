
export default function Loader({ label = 'Loading…' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-gray-600">
      <span className="loader" /> {label}
    </span>
  )
}
