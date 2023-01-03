import './AdminPage.css'
import React, { useEffect, useState } from 'react'
import { ScreenSelectorPanel } from './TopScreenSelectorPanel'
import { IScreenEditorProps, ScreenEditor } from './ScreenEditor'
import { getFileList, createFile, updateFile } from '../../utils/postFileToGit'

export const AdminPage = () => {
  const [screens, setScreens] = useState<string[]>([])
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null)
  const [initialScreens, setInitialScreens] = useState<string[]>([])

  const handleNewScreenAction = async (newScreenName: string) => {
    setScreens(prevState => {
      return [...prevState, newScreenName]
    })
    setSelectedScreen(newScreenName)
    console.log(newScreenName)
  }
  const saveScreenInRepo = async (content: string, prevSha: string) => {
    if (!selectedScreen) {
      return
    }
    if (initialScreens.includes(selectedScreen)) {
      await updateFile(selectedScreen, content, prevSha)
    } else {
      await createFile(selectedScreen, content)
      setInitialScreens([...initialScreens, selectedScreen])
    }
  }
  // Fetch the list of screens for the specified cinema and day
  useEffect(() => {
    async function fetchScreens() {
      // Make a call to the external API to retrieve the list of screens
      const response = await getFileList()

      setScreens(response.map(value => value.name.replace('.json', '')))
      setInitialScreens(response.map(value => value.name.replace('.json', '')))
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
      ></ScreenEditor>
    </div>
  )
}
