import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import './App.css'
import { useEffect, useState } from 'react'
import { PollingConfig } from '../../types/ScheduleTypes'
import React from 'react'
import { SettingsPage } from '../SettingPage/SettingsPage'
import { SchedulePage } from '../SchedulePage/SchedulePage'
import { useCookies } from 'react-cookie'
import Media from '../Media/Media'
import { AdminPage } from '../AdminPage/AdminPage'

function ScheduleByFileName() {
  let { fileName } = useParams()
  return (
    <SchedulePage
      pollingConfig={{
        configFileName: fileName
      }}
    />
  )
}

export default function App() {
  const [pollingConfig, setPollingConfig] = useState<PollingConfig | null>(null)
  const [cookie, setCookie] = useCookies(['pollingConfig'])

  useEffect(() => {
    const initialPollingConfig = cookie.pollingConfig as PollingConfig
    console.log('Reading cookie pollingConfig: ' + JSON.stringify(initialPollingConfig))
    setPollingConfig(initialPollingConfig ?? null)
    setCookie('pollingConfig', initialPollingConfig, {
      expires: new Date(2200, 10, 10)
    })
  }, [])
  console.log('pollingConfig: ' + JSON.stringify(pollingConfig))

  return (
    <Router>
      <Routes>
        <Route path="/media" element={<Media />} />
        <Route
          path="/settings"
          element={<SettingsPage setPollingConfig={setPollingConfig} pollingConfig={pollingConfig} />}
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<SchedulePage pollingConfig={pollingConfig} />} />
        <Route path="/byFileName">
          <Route path=":fileName" element={<ScheduleByFileName />} />
        </Route>
      </Routes>
    </Router>
  )
}
