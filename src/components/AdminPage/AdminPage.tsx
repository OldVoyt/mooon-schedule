import './AdminPage.css'
import React, { useEffect, useState } from 'react'
import { ScreenSelectorPanel } from './TopScreenSelectorPanel'
import { IScreenEditorProps, ScreenEditor } from './ScreenEditor'
import {
  deleteScheduleSettings,
  getScheduleSettingsList,
  updateScheduleSettings
} from '../../utils/scheduleSettingsRepository'
import { ScheduleSettings } from '../../types/ScheduleTypes'

export const AdminPage = () => {
  const [screens, setScreens] = useState<string[]>([])
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null)
  const [initialScreens, setInitialScreens] = useState<string[]>([])

  const handleNewScreenAction = async (newScreenName: string) => {
    setScreens(prevState => {
      return [...prevState, newScreenName]
    })
    setSelectedScreen(newScreenName)
  }
  const saveScreenInRepo = async (settings: ScheduleSettings) => {
    if (!selectedScreen) {
      return
    }
    if (initialScreens.includes(selectedScreen)) {
      await updateScheduleSettings(settings)
    } else {
      await updateScheduleSettings(settings)
      setInitialScreens([...initialScreens, selectedScreen])
    }
  }

  const deleteScreen = async () => {
    if (!selectedScreen) {
      return
    }
    if (initialScreens.includes(selectedScreen)) {
      if (!(await deleteScheduleSettings(selectedScreen))) {
        return
      }
    }
    setInitialScreens(prevScreens => prevScreens.filter(value => value != selectedScreen))
    setScreens(prevScreens => prevScreens.filter(value => value != selectedScreen))
    setSelectedScreen(null)
  }

  // Fetch the list of screens for the specified cinema and day
  useEffect(() => {
    async function fetchScreens() {
      // Make a call to the external API to retrieve the list of screens
      const response = await getScheduleSettingsList()

      setScreens(response.map(value => value.Name))
      setInitialScreens(response.map(value => value.Name))
    }
    fetchScreens()
  }, [])

  return (
    <div className="settings-container">
      <ScreenSelectorPanel
        screenNames={screens}
        selectedScreenName={selectedScreen}
        onAddScreen={handleNewScreenAction}
        onSelectScreen={setSelectedScreen}
      ></ScreenSelectorPanel>
      <ScreenEditor
        screenName={selectedScreen}
        isNew={selectedScreen ? !initialScreens.includes(selectedScreen) : null}
        onSave={saveScreenInRepo}
        onDelete={deleteScreen}
      ></ScreenEditor>
    </div>
  )
}
