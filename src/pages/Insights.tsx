
import Loader from '../components/Loader'
import { usePredict } from '../hooks/usePredict'
import { useSymptoms } from '../hooks/useSymptoms'

export default function Insights() {
  const { mutateAsync, isPending, data, isError, error, reset } = usePredict()
  const { data: symptoms } = useSymptoms()
  const last = symptoms?.[0]

  const avgSeverity = symptoms && symptoms.length
    ? Math.round(symptoms.reduce((a, b) => a + b.severity, 0) / symptoms.length)
    : 0
  const byType = (symptoms || []).reduce<Record<string, number>>((acc, s) => {
    acc[s.type] = (acc[s.type] || 0) + 1
    return acc
  }, {})

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <section className="card p-4">
        <h2 className="text-lg font-semibold mb-2">Predictive Insights (mock)</h2>
        <p className="text-sm text-gray-600 mb-4">Simulates a 1–2s AI call and returns a sample prediction.</p>
        <div className="flex items-center gap-3 mb-4">
          <button className="btn" onClick={() => mutateAsync({ lastSymptom: last })} disabled={isPending}>
            {isPending ? <><span className="loader"></span> Getting Prediction…</> : 'Get Prediction'}
          </button>
          {data && <button className="btn-secondary" onClick={() => reset()}>Clear</button>}
        </div>
        {isPending && <Loader label="Calling AI…" />}
        {isError && <div className="text-red-600 text-sm">{(error as Error)?.message}</div>}
        {data && (
          <div className="border rounded-xl p-4">
            <div className="text-sm text-gray-500">Result</div>
            <div className="text-lg font-medium mt-1">{data.prediction}</div>
            <div className="text-sm text-gray-600 mt-1">Confidence: <span className="font-semibold">{data.confidence}%</span></div>
            {last && <div className="text-xs text-gray-500 mt-2">Based on last symptom: <span className="font-medium">{last.type}</span> (severity {last.severity})</div>}
          </div>
        )}
      </section>

      <section className="card p-4">
        <h3 className="font-semibold mb-2">Session Trends</h3>
        {!symptoms?.length ? (
          <div className="text-sm text-gray-500">No data yet. Log a few entries to see trends.</div>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-600">Average Severity</div>
              <div className="text-2xl font-semibold">{avgSeverity}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Symptoms by Type</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(byType).map(([k, v]) => (
                  <span key={k} className="badge">{k}: {v}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
