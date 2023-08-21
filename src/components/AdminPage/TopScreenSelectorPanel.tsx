import Select from 'react-select'
import { Options } from 'react-select/dist/declarations/src/types'
import './AdminPage.css'

export interface IScreenSelectorPanelProps {
  selectedScreenName: string | null
  screenNames: string[]
  onAddScreen: (screenName: string) => void
  onSelectScreen: (screenName: string) => void
}

export const ScreenSelectorPanel = ({
  selectedScreenName,
  screenNames,
  onAddScreen,
  onSelectScreen
}: IScreenSelectorPanelProps) => {
  // Function to handle adding a new screen to the list
  function handleAddScreen() {
    const newScreenName = window.prompt('Имя нового экрана')
    if (newScreenName) {
      onAddScreen(newScreenName)
    }
  }
  const screenOptions: Options<{ value: string; label: string }> = screenNames.map(value => {
    return {
      value: value,
      label: value
    }
  })
  return (
    <div className="screen-selector-panel">
      {/* Render the list of screens */}
      <Select
        className="screen-selector"
        options={screenOptions}
        onChange={newValue => onSelectScreen(newValue!.label)}
        isSearchable={false}
        placeholder={'Выберите экран...'}
        value={selectedScreenName ? screenOptions.find(value => value.value === selectedScreenName) : null}
      />
      {/* Render the add and save buttons */}
      <button type="button" className="add-screen-button" onClick={handleAddScreen}>
        +
      </button>
    </div>
  )
}
