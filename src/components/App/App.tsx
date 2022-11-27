import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { useState } from 'react'
import { PollingConfig } from '../../types/ScheduleTypes'
import React from 'react'
import { SettingsPage } from '../SettingPage/SettingsPage'
import { SchedulePage } from '../SchedulePage/SchedulePage'

export default function App() {
  const [pollingConfig, setPollingConfig] = useState<PollingConfig>({
    Theatre: {
      Name: 'ТРЦ "Palazzo"',
      Id: '19'
    },
    DayOffset: 0
  })

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SettingsPage setPollingConfig={setPollingConfig} />} />
        <Route path="/schedule" element={<SchedulePage pollingConfig={pollingConfig} />} />
      </Routes>
    </Router>
  )
}
