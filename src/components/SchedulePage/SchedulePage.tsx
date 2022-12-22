import { TopPanel } from '../TopPanel/TopPanel'
import { MoviesList } from '../MoviesList/MoviesList'
import { useEffect, useState } from 'react'
import { PollingConfig, SchedulePageState } from '../../types/ScheduleTypes'
import usePolling from '../../hooks/usePolling'
import React from 'react'
import './SchedulePage.css'
import { useLogger } from '../../hooks/useLogger'
import { reloadShows } from '../../utils/reloadShows'

export interface ISchedulePageProps {
  pollingConfig: PollingConfig | null
}

export const SchedulePage = ({ pollingConfig }: ISchedulePageProps) => {
  const [pageState, setPageState] = useState<SchedulePageState>({})
  const [date, setDate] = useState<Date | null>(null)
  const logger = useLogger(pollingConfig)
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
      await reloadShows(
        value => {
          setPageState(value)
          localStorage.setItem('schedulePageState', JSON.stringify(value))
        },
        pollingConfig,
        logger
      )
    },
    30000,
    [pollingConfig]
  )

  return (
    <div className="schedule-main">
      {TopPanel(date, pollingConfig?.Theatre?.Name)}
      {pageState.shows && MoviesList(pageState.shows)}
    </div>
  )
}
