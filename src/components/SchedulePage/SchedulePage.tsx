import { TopPanel } from '../TopPanel/TopPanel'
import { MoviesList } from '../MoviesList/MoviesList'
import { useEffect, useState } from 'react'
import { PollingConfig, SchedulePageState } from '../../types/ScheduleTypes'
import usePolling from '../../hooks/usePolling'
import React from 'react'
import './SchedulePage.css'
import { useLogger } from '../../hooks/useLogger'
import { reloadShows } from '../../utils/reloadShows'
import { reloadRemoteAppConfig } from '../../utils/reloadRemoteAppConfig'
import { TheatresAvailable } from '../../types/Settings'
import { useNavigate } from 'react-router-dom'
import { VideoPlayer } from './VideoPlayer'

export interface ISchedulePageProps {
  pollingConfig: PollingConfig | null
}

export const SchedulePage = ({ pollingConfig }: ISchedulePageProps) => {
  const [pageState, setPageState] = useState<SchedulePageState>({})
  const [date, setDate] = useState<Date | null>(null)
  const logger = useLogger(pageState)
  const navigate = useNavigate()

  useEffect(() => {
    const initialPageState = localStorage.getItem('schedulePageState')
    console.log('Reading local storage: schedulePageState: ' + JSON.stringify(initialPageState))
    if (initialPageState) setPageState(JSON.parse(initialPageState))
  }, [])

  useEffect(() => {
    if (!pageState.config?.cssBackgroundString) return
    if (pageState.config?.cssBackgroundString) {
      document.body.style.backgroundImage = pageState.config?.cssBackgroundString
    }
  }, [pageState.config?.cssBackgroundString])

  usePolling(
    async () => {
      if (!pollingConfig) {
        return
      }
      const currentDate = new Date()

      setDate(currentDate)

      await reloadRemoteAppConfig(pollingConfig, logger, value => {
        localStorage.setItem('schedulePageState', JSON.stringify(value))
      })
      await reloadShows(value => {
        localStorage.setItem('schedulePageState', JSON.stringify(value))
      }, logger)

      const pageState = localStorage.getItem('schedulePageState')
      if (pageState) {
        const pageStateParsed = JSON.parse(pageState) as SchedulePageState
        setPageState(pageStateParsed)
      }
    },
    30000,
    [pollingConfig]
  )
  if (pageState.config?.IsAdvertisementEnabled) {
    if (window.innerHeight > window.innerWidth) {
      return <VideoPlayer videoLink={pageState.config.VerticalVideoLink!} />
    } else {
      return <VideoPlayer videoLink={pageState.config.HorizontalVideoLink!} />
    }
  }
  return (
    <div className="schedule-main">
      {TopPanel(date, navigate, TheatresAvailable.find(value => value.Id == pageState.config?.TheatreId)?.Name ?? '')}
      {pageState.shows && MoviesList(pageState)}
      <span className="monitor-info">{`Монитор: ${
        pollingConfig?.configFileName ?? 'не выбран'
      }. Последнее обновление расписания: ${
        pageState.lastScheduleUpdatedTime ? new Date(pageState.lastScheduleUpdatedTime).toLocaleString() : 'не было'
      }`}</span>
    </div>
  )
}
