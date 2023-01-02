import { PollingConfig, SchedulePageState } from '../types/ScheduleTypes'

export interface ILogger {
  logInfo: (message: string) => void
  logError: (error: Error) => void
}

export const useLogger = (pageState: SchedulePageState | null): ILogger => {
  return {
    logInfo: message => {
      if (pageState?.config?.LoggerEnabled) {
        console.log(message)
      }
    },
    logError: console.error
  }
}
