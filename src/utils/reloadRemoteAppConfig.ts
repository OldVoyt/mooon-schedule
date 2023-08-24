import { ILogger } from '../hooks/useLogger'
import { PollingConfig, SchedulePageState, ScreenConfig } from '../types/ScheduleTypes'
import { getCachedScheduleByName } from './cachedScheduleRepository'

export const reloadRemoteAppConfig = async (pollingConfig: PollingConfig, logger: ILogger) => {
  const localPageState = localStorage.getItem('schedulePageState')
  const pageState: SchedulePageState = localPageState ? JSON.parse(localPageState) : {}
  const currentTime = new Date()
  if (
    pageState.lastConfigUpdatedTime &&
    (currentTime.getTime() - new Date(pageState.lastConfigUpdatedTime).getTime()) / (1000 * 60) < 3
  ) {
    return
  }
  if (pollingConfig.configFileName) {
    const settingsFile = await getCachedScheduleByName(pollingConfig.configFileName)
    return settingsFile
  }
}
