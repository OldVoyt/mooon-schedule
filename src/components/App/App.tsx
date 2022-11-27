import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { useState } from 'react'
import { XMLParser } from 'fast-xml-parser'
import MoviesList from '../MoviesList/MoviesList'
import { Show } from '../../types/ScheduleTypes'
import usePolling from '../../hooks/usePolling'
import { TopPanel } from '../TopPanel/TopPanel'

export default function App() {
  const [data, setData] = useState<Show[] | null>(null)
  const [date, setDate] = useState<Date | null>(null)

  usePolling(async () => {
    const currentDate = new Date()
    await fetch(
      `https://soft.silverscreen.by:8443/wssite/webapi/xml?mode=showtimes&date=${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}&theater=19`
    )
      .then((resp) => resp.text())
      .then((text) => new XMLParser().parse(text))
      .then((value) => {
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
  }, 30000)

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="schedule-main">
              {date && TopPanel(date)}
              {data && MoviesList(data)}
            </div>
          }
        />
      </Routes>
    </Router>
  )
}
