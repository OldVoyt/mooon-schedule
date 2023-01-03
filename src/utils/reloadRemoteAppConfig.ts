import { ILogger } from '../hooks/useLogger'
import { PollingConfig, SchedulePageState, ScreenConfig } from '../types/ScheduleTypes'
import { getFile } from './postFileToGit'

export const reloadRemoteAppConfig = async (
  pollingConfig: PollingConfig,
  logger: ILogger,
  setData: (value: SchedulePageState) => void
) => {
  const localPageState = localStorage.getItem('schedulePageState')
  const pageState: SchedulePageState = localPageState ? JSON.parse(localPageState) : {}
  const currentTime = new Date()
  if (
    pageState.lastConfigUpdatedTime &&
    (currentTime.getTime() - new Date(pageState.lastConfigUpdatedTime).getTime()) / (1000 * 60) < 15
  ) {
    return
  }
  if (pollingConfig.configFileName) {
    const settingsFile = await getFile(pollingConfig.configFileName)
    const settings = JSON.parse(settingsFile.content) as ScreenConfig
    setData({
      ...pageState,
      shows: pageState.config?.TheatreId == settings.TheatreId ? pageState.shows : [],
      config: settings,
      lastConfigUpdatedTime: currentTime,
      configFileInfo: {
        PreviousShaForConfigFile: settingsFile.sha
      }
    })
  }
}
