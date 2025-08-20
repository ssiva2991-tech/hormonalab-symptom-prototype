
import Loader from '../components/Loader'
import { useSymptoms } from '../hooks/useSymptoms'

export default function RecentEntries() {
  const { data, isLoading, isError, error } = useSymptoms()

  return (
    <section className="card p-4">
      <h3 className="font-semibold mb-3">Recent Entries</h3>
      {isLoading && <Loader label="Loading entries…" />}
      {isError && <div className="text-red-600 text-sm">{(error as Error)?.message}</div>}
      {!isLoading && !data?.length && <div className="text-sm text-gray-500">No symptoms logged yet.</div>}
      <ul className="divide-y">
        {(data || []).map((s) => (
          <li key={s.id} className="py-3">
            <div className="font-medium">{s.type} <span className="badge ml-2">Severity {s.severity}</span></div>
            <div className="text-xs text-gray-500">{new Date(s.date).toLocaleString()}</div>
            {s.notes && <div className="text-sm text-gray-700 mt-1">{s.notes}</div>}
          </li>
        ))}
      </ul>
    </section>
  )
}
