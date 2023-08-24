import { TopPanel } from '../TopPanel/TopPanel'
import { MoviesList } from '../MoviesList/MoviesList'
import { useEffect, useState } from 'react'
import { CachedScheduleData, PollingConfig, SchedulePageState } from '../../types/ScheduleTypes'
import usePolling from '../../hooks/usePolling'
import React from 'react'
import './SchedulePage.css'
import { useLogger } from '../../hooks/useLogger'
import { reloadRemoteAppConfig } from '../../utils/reloadRemoteAppConfig'
import { TheatresAvailable } from '../../types/Settings'
import { useNavigate } from 'react-router-dom'
import { VideoPlayer } from './VideoPlayer'

export interface ISchedulePageProps {
  pollingConfig: PollingConfig | null
}

export const SchedulePage = ({ pollingConfig }: ISchedulePageProps) => {
  const [cachedScheduleData, setCachedScheduleData] = useState<CachedScheduleData | null>(null)
  const [date, setDate] = useState<Date | null>(null)
  const logger = useLogger(cachedScheduleData)
  const navigate = useNavigate()

  useEffect(() => {
    if (!cachedScheduleData?.cssBackgroundString || cachedScheduleData?.cssBackgroundString == '') return
    document.body.style.backgroundImage = cachedScheduleData?.cssBackgroundString
  }, [cachedScheduleData?.cssBackgroundString])
  usePolling(
    async () => {
      if (!pollingConfig) {
        navigate('/settings')
        return
      }
      const cachedScheduleData = await reloadRemoteAppConfig(pollingConfig, logger)
      if (cachedScheduleData) setCachedScheduleData(cachedScheduleData)
    },
    5 * 60000,
    [pollingConfig]
  )
  usePolling(
    async () => {
      if (!pollingConfig) {
        return
      }
      const currentDate = new Date()
      setDate(currentDate)
    },
    30000,
    [pollingConfig]
  )
  if (!cachedScheduleData) {
    return <div>Идет загрузка...</div>
  }
  return (
    <div className="schedule-main">
      {TopPanel(date, navigate, TheatresAvailable.find(value => value.Id == cachedScheduleData?.TheatreId)?.Name ?? '')}
      {cachedScheduleData.shows && MoviesList(cachedScheduleData)}
      <span className="monitor-info">{`Монитор: ${
        pollingConfig?.configFileName ?? 'не выбран'
      }. Последнее обновление расписания: ${
        cachedScheduleData.lastUpdatedTime ? new Date(cachedScheduleData.lastUpdatedTime).toLocaleString() : 'не было'
      }`}</span>
    </div>
  )
}
