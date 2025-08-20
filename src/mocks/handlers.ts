
import { http, HttpResponse } from 'msw'

let symptoms: any[] = []
const delay = (min = 1000, max = 2000) => new Promise((r) => setTimeout(r, Math.floor(Math.random() * (max - min)) + min))

export const handlers = [
  http.get('/api/symptoms', async () => {
    await delay()
    const rows = [...symptoms].sort((a, b) => b.createdAt - a.createdAt)
    return HttpResponse.json(rows, { status: 200 })
  }),

  http.post('/api/symptoms', async ({ request }) => {
    await delay()
    if (Math.random() < 0.1) return new HttpResponse('Temporary mock failure', { status: 503 })
    const body = await request.json() as any
    const row = { id: crypto.randomUUID(), createdAt: Date.now(), ...body }
    symptoms.push(row)
    return HttpResponse.json(row, { status: 201 })
  }),

  http.post('/api/predict', async () => {
    await delay()
    const options = [
      'Likely viral prodrome; monitor hydration',
      'Pattern suggests seasonal allergy',
      'Symptoms mild—consider rest and fluids',
      'If pain persists >48h, consider clinical review',
      'Low-risk; log again after medication',
    ]
    const prediction = options[Math.floor(Math.random() * options.length)]
    const confidence = Math.round(70 + Math.random() * 25)
    return HttpResponse.json({ prediction, confidence }, { status: 200 })
  }),

  http.get('/api/wearable', async () => {
    await delay()
    return HttpResponse.json({
      heartRate: 60 + Math.floor(Math.random() * 50),
      sleepHours: Number((5 + Math.random() * 3).toFixed(1)),
      lastSync: new Date().toISOString(),
    }, { status: 200 })
  }),
]
