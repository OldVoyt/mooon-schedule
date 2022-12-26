import { PollingConfig } from '../types/ScheduleTypes'

export interface ILogger {
  logInfo: (message: string) => void
  logError: (error: Error) => void
}

export const useLogger = (pollingConfig: PollingConfig | null): ILogger => {
  return {
    logInfo: message => {
      if (!pollingConfig?.LoggerEnabled) {
        console.log(message)
      }
    },
    logError: console.error
  }
}
