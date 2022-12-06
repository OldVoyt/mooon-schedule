import { TopPanel } from '../TopPanel/TopPanel'
import { MoviesList } from '../MoviesList/MoviesList'
import { useState } from 'react'
import { PollingConfig, Show } from '../../types/ScheduleTypes'
import usePolling from '../../hooks/usePolling'
import { XMLParser } from 'fast-xml-parser'
import React from 'react'
import './SchedulePage.css'

export interface ISchedulePageProps {
  pollingConfig: PollingConfig | null
}

export const SchedulePage = ({ pollingConfig }: ISchedulePageProps) => {
  const [data, setData] = useState<Show[] | null>(null)
  const [date, setDate] = useState<Date | null>(null)

  usePolling(
    async () => {
      if (!pollingConfig) {
        return
      }
      const currentDate = new Date()
      const url = `https://soft.silverscreen.by:8443/wssite/webapi/xml?mode=showtimes&date=${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate() + pollingConfig.DayOffset}&theater=${pollingConfig.Theatre.Id}`
      console.log('start fetching ' + url)
      await fetch(url)
        .then(resp => resp.text())
        .then(text => new XMLParser().parse(text))
        .then(value => {
          try {
            if (Array.isArray(value.Schedule.Shows.Show)) {
              setData(value.Schedule.Shows.Show)
            } else {
              setData([value.Schedule.Shows.Show])
            }
            setDate(currentDate)
          } catch (e) {
            setData([])
            setDate(currentDate)
          }
        })
    },
    30000,
    [pollingConfig]
  )

  return (
    <div className="schedule-main">
      {TopPanel(date, pollingConfig?.Theatre?.Name)}
      {data && MoviesList(data)}
    </div>
  )
}
