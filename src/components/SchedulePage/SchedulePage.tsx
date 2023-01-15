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

export interface ISchedulePageProps {
  pollingConfig: PollingConfig | null
}

export const SchedulePage = ({ pollingConfig }: ISchedulePageProps) => {
  const [pageState, setPageState] = useState<SchedulePageState>({})
  const [date, setDate] = useState<Date | null>(null)
  const logger = useLogger(pageState)
  useEffect(() => {
    const initialPageState = localStorage.getItem('schedulePageState')
    console.log('Reading local storage: schedulePageState: ' + JSON.stringify(initialPageState))
    if (initialPageState) setPageState(JSON.parse(initialPageState))
  }, [])
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
        setPageState(JSON.parse(pageState))
      }
    },
    30000,
    [pollingConfig]
  )

  return (
    <div className="schedule-main">
      {TopPanel(date, TheatresAvailable.find(value => value.Id == pageState.config?.TheatreId)?.Name ?? '')}
      {pageState.shows && MoviesList(pageState)}
    </div>
  )
}
