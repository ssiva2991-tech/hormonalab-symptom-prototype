
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'

export type Symptom = {
  id: string
  createdAt: number
  date: string
  type: string
  severity: number
  duration?: string
  notes?: string
}

export function useSymptoms() {
  return useQuery<Symptom[]>({ queryKey: ['symptoms'], queryFn: () => api('/api/symptoms') })
}

export function useCreateSymptom() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Omit<Symptom, 'id' | 'createdAt'>) =>
      api<Symptom>('/api/symptoms', { method: 'POST', body: JSON.stringify(payload) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['symptoms'] }),
  })
}
