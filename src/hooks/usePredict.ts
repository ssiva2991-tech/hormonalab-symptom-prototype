
import { useMutation } from '@tanstack/react-query'
import { api } from '../lib/api'

export type Prediction = { prediction: string; confidence: number }

export function usePredict() {
  return useMutation({
    mutationFn: (payload?: any) => api<Prediction>('/api/predict', { method: 'POST', body: JSON.stringify(payload ?? {}) }),
  })
}
