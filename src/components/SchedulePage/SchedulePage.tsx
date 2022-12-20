import { TopPanel } from '../TopPanel/TopPanel'
import { MoviesList } from '../MoviesList/MoviesList'
import { useLayoutEffect, useState } from 'react'
import { PollingConfig, SchedulePageState } from '../../types/ScheduleTypes'
import usePolling from '../../hooks/usePolling'
import React from 'react'
import './SchedulePage.css'
import { useLogger } from '../../hooks/useLogger'
import { reloadShows } from '../../utils/reloadShows'
import { useCookies } from 'react-cookie'

export interface ISchedulePageProps {
  pollingConfig: PollingConfig | null
}

export const SchedulePage = ({ pollingConfig }: ISchedulePageProps) => {
  const [pageState, setPageState] = useState<SchedulePageState>({})
  const [date, setDate] = useState<Date | null>(null)
  const logger = useLogger(pollingConfig)
  const [schedulePageStateCookie, setSchedulePageStateCookie] = useCookies(['schedulePageState'])
  useLayoutEffect(() => {
    const initialPageState = schedulePageStateCookie.schedulePageState as SchedulePageState
    console.log('Reading cookie schedulePageState: ' + JSON.stringify(initialPageState))
    if (initialPageState) setPageState(initialPageState)
  }, [])
  usePolling(
    async () => {
      if (!pollingConfig) {
        return
      }
      const currentDate = new Date()

      setDate(currentDate)
      await reloadShows(
        pageState,
        value => {
          setPageState(value)
          setSchedulePageStateCookie('schedulePageState', value, {
            expires: new Date(2200, 10, 10)
          })
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
