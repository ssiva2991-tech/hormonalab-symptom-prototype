import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateSymptom } from '../hooks/useSymptoms'

export default function LogSymptoms() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 16),
    type: '',
    severity: 5,
    duration: '',
    notes: '',
  })
  const { mutateAsync, isPending, isError: isSaveError, error: saveError, isSuccess } = useCreateSymptom()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.type.trim()) return
    await mutateAsync({
      date: form.date,
      type: form.type.trim(),
      severity: Number(form.severity),
      duration: form.duration.trim() || undefined,
      notes: form.notes.trim() || undefined,
    })
    setForm((f) => ({ ...f, type: '', severity: 5, duration: '', notes: '' }))
  }

  function onReset() {
    setForm({
      date: new Date().toISOString().slice(0, 16),
      type: '',
      severity: 5,
      duration: '',
      notes: '',
    })
  }

  return (
    <section className="card p-4 max-w-2xl">
      <h2 className="text-lg font-semibold mb-4">Log a Symptom</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <label className="block">
          <div className="label">Date & Time</div>
          <input
            type="datetime-local"
            className="input"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </label>
        <label className="block">
          <div className="label">Symptom Type</div>
          <input
            className="input"
            placeholder="e.g., Headache, Fever, Cough"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            required
          />
        </label>
        <label className="block">
          <div className="label">Severity: {form.severity}</div>
          <input
            type="range"
            min={1}
            max={10}
            value={form.severity}
            onChange={(e) => setForm({ ...form, severity: Number(e.target.value) })}
            className="w-full"
          />
        </label>
        <label className="block">
          <div className="label">Duration</div>
          <input
            className="input"
            placeholder="e.g., 2 hours, since morning"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />
        </label>
        <label className="block">
          <div className="label">Notes</div>
          <textarea
            className="input"
            rows={3}
            placeholder="Anything else relevant…"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </label>

        {/* Buttons Row: Reset | Cancel | Submit */}
        <div className="flex items-center gap-3 pt-2">
          <button type="button" className="btn-ghost" onClick={onReset}>
            Reset
          </button>
          <button type="button" className="btn-ghost" onClick={() => navigate('/entries')}>
            Cancel
          </button>
          <button className="btn" type="submit" disabled={isPending || !form.type.trim()}>
            {isPending ? <><span className="loader"></span> Saving…</> : 'Save'}
          </button>
          {isSuccess && <span className="text-green-700 text-sm">Saved!</span>}
          {isSaveError && <span className="text-red-600 text-sm">{(saveError as Error)?.message}</span>}
        </div>
      </form>
    </section>
  )
}
