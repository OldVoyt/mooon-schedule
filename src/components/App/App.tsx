import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { useEffect, useState } from 'react'
import { PollingConfig } from '../../types/ScheduleTypes'
import React from 'react'
import { SettingsPage } from '../SettingPage/SettingsPage'
import { SchedulePage } from '../SchedulePage/SchedulePage'
import { useCookies } from 'react-cookie'

export default function App() {
  const [pollingConfig, setPollingConfig] = useState<PollingConfig | null>(null)
  const [cookie] = useCookies(['pollingConfig'])

  useEffect(() => {
    const initialPollingConfig = cookie.pollingConfig as PollingConfig
    console.log('Reading cookie pollingConfig: ' + JSON.stringify(initialPollingConfig))
    setPollingConfig(initialPollingConfig ?? null)
  }, [])
  console.log('pollingConfig: ' + JSON.stringify(pollingConfig))

  return (
    <Router>
      <Routes>
        <Route
          path="/settings"
          element={<SettingsPage setPollingConfig={setPollingConfig} pollingConfig={pollingConfig} />}
        />
        <Route path="/" element={<SchedulePage pollingConfig={pollingConfig} />} />
      </Routes>
    </Router>
  )
}
