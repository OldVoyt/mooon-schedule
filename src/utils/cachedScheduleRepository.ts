import { CachedScheduleData } from '../types/ScheduleTypes'
import { env } from '../env'

export const getCachedScheduleByName = async (name: string): Promise<CachedScheduleData> => {
  const response = await fetch(`${env.BACKEND_URL}/cachedScheduleData/${name}`, {
    method: 'GET'
  })

  const result = (await response.json()) as CachedScheduleData
  return result
}
