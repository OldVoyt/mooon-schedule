import { ScheduleSettings } from '../types/ScheduleTypes'
import { env } from '../env'

export const getScheduleSettings = async (fileName: string): Promise<ScheduleSettings> => {
  const response = await fetch(`${env.BACKEND_URL}/scheduleSettings/${fileName}`, {
    method: 'GET'
  })

  const file = await response.json()
  return file as ScheduleSettings
}

export const updateScheduleSettings = async (scheduleSettings: ScheduleSettings) => {
  const response = await fetch(`${env.BACKEND_URL}/scheduleSettings`, {
    method: 'POST',
    body: JSON.stringify(scheduleSettings),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return (await response.json()) as ScheduleSettings
}

export const deleteScheduleSettings = async (fileName: string): Promise<boolean> => {
  try {
    const response = await fetch(`${env.BACKEND_URL}/scheduleSettings/${fileName}`, {
      method: 'DELETE'
    })
    console.log('File deleted:' + fileName)
    return true
  } catch (e) {
    console.error('Failed to delete:' + JSON.stringify(e))
  }
  return false
}

export const getScheduleSettingsList = async (): Promise<ScheduleSettings[]> => {
  const response = await fetch(`${env.BACKEND_URL}/scheduleSettings`, {
    method: 'GET'
  })

  const files = (await response.json()) as ScheduleSettings[]
  return files
}
