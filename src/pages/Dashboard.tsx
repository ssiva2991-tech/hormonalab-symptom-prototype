
import { Link } from 'react-router-dom'
import { useSymptoms } from '../hooks/useSymptoms'
import { useWearable } from '../hooks/useWearable'
import Loader from '../components/Loader'
import { MetricCard } from '../components/MetricCard'
import { timeAgo } from '../utils/format'

export default function Dashboard() {
  const { data: symptoms, isLoading: sLoading } = useSymptoms()
  const { data: wearable } = useWearable(false)

  const today = new Date().toDateString()
  const entriesToday = (symptoms || []).filter((s) => new Date(s.date).toDateString() === today)
  const lastSymptom = (symptoms || [])[0]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <div className="flex gap-2">
          <Link to="/log" className="btn">Log a Symptom</Link>
          <Link to="/insights" className="btn-secondary">Get Prediction</Link>
        </div>
      </div>

      {sLoading ? (
        <Loader label="Loading snapshot…" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Entries today" value={entriesToday.length} />
          <MetricCard title="Last symptom" value={lastSymptom ? lastSymptom.type : '—'} hint={lastSymptom ? timeAgo(lastSymptom.createdAt) : '—'} />
          <MetricCard title="Wearable: HR" value={wearable ? wearable.heartRate : '—'} hint={wearable ? timeAgo(wearable.lastSync) : 'Not connected'} />
          <MetricCard title="Wearable: Sleep" value={wearable ? `${wearable.sleepHours} h` : '—'} />
        </div>
      )}

      <section className="card p-4">
        <h3 className="font-semibold mb-3">Recent Activity</h3>
        {!symptoms?.length && <div className="text-sm text-gray-500">No entries yet. Start by logging a symptom.</div>}
        <ul className="divide-y">
          {(symptoms || []).slice(0, 5).map((s) => (
            <li key={s.id} className="py-3 flex items-center justify-between">
              <div className="min-w-0">
                <div className="font-medium truncate">{s.type} <span className="badge ml-2">Severity {s.severity}</span></div>
                <div className="text-xs text-gray-500">{new Date(s.date).toLocaleString()} • {timeAgo(s.createdAt)}</div>
              </div>
              {s.duration && <div className="text-sm text-gray-600">{s.duration}</div>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
