
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'

export type Wearable = { heartRate: number; sleepHours: number; lastSync: string }

export function useWearable(enabled: boolean) {
  return useQuery<Wearable>({ queryKey: ['wearable'], queryFn: () => api('/api/wearable'), enabled })
}
