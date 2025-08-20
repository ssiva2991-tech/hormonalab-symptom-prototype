
export function MetricCard({ title, value, hint }: { title: string; value: string | number; hint?: string }) {
  return (
    <div className="card p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
    </div>
  )
}
