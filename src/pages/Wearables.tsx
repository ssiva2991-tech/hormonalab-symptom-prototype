
import { useState } from 'react'
import Loader from '../components/Loader'
import { useWearable } from '../hooks/useWearable'
import { timeAgo } from '../utils/format'

export default function Wearables() {
  const [connected, setConnected] = useState(false)
  const { data, isLoading, isError, error, refetch, isFetching } = useWearable(connected)

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Wearables (mock)</h2>

      {!connected ? (
        <div className="card p-6">
          <p className="text-sm text-gray-600 mb-4">Connect to a wearable (mock endpoint) to fetch heart rate & sleep data.</p>
          <button className="btn" onClick={() => setConnected(true)}>Connect Wearable</button>
        </div>
      ) : (
        <div className="card p-4 space-y-4">
          {(isLoading || isFetching) && <Loader label="Syncing…" />}
          {isError && <div className="text-red-600 text-sm">{(error as Error)?.message}</div>}
          {data && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="card p-4">
                <div className="text-sm text-gray-500">Heart Rate</div>
                <div className="text-2xl font-semibold">{data.heartRate} bpm</div>
              </div>
              <div className="card p-4">
                <div className="text-sm text-gray-500">Sleep Hours</div>
                <div className="text-2xl font-semibold">{data.sleepHours} h</div>
              </div>
              <div className="card p-4">
                <div className="text-sm text-gray-500">Last Synced</div>
                <div className="text-base">{timeAgo(data.lastSync)}</div>
              </div>
            </div>
          )}
          <div>
            <button className="btn" onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? <><span className="loader"></span> Syncing…</> : 'Sync'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
