import { ScreenConfig, Theatre } from '../../types/ScheduleTypes'
import { useEffect, useState } from 'react'
import { DaysOffsetAvailable, TheatresAvailable } from '../../types/Settings'
import { getFile, getFileList } from '../../utils/postFileToGit'
import { Options } from 'react-select/dist/declarations/src/types'
import './AdminPage.css'
import Select from 'react-select'

export interface IScreenEditorProps {
  screenName: string | null
  isNew: boolean | null
  onSave: (contents: string, prevSha: string) => Promise<void>
  onDelete: (prevSha: string) => Promise<void>
}

const theatreOptions: Options<{ value: string; label: string }> = TheatresAvailable.map(value => {
  return {
    value: value.Id,
    label: value.Name
  }
})

const getOffsetMessage = (dayOffset: number): string => {
  switch (dayOffset) {
    case 0:
      return 'сегодня'
    case 1:
      return 'завтра'
    case 2:
      return 'послезавтра'
  }
  return `сегодня + ${dayOffset} дней`
}

const daysOffsetOptions: Options<{ value: string; label: string }> = DaysOffsetAvailable.map(value => {
  return {
    value: value.toString(),
    label: getOffsetMessage(value)
  }
})

export const ScreenEditor = ({ screenName, isNew, onSave, onDelete }: IScreenEditorProps) => {
  const [sha, setSha] = useState<string>('')
  const [theatreId, setTheatreId] = useState<string>('')
  const [scheduleDay, setScheduleDay] = useState<number>(0)
  const [loggingEnabled, setLoggingEnabled] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [highlightedMovieName, setHighlightedMovieName] = useState<string>('')
  const [isAdvertisementEnabled, setIsAdvertisementEnabled] = useState<boolean>(false)
  const [verticalVideoLink, setVerticalVideoLink] = useState<string>('')
  const [horizontalVideoLink, setHorizontalVideoLink] = useState<string>('')
  const [cssBackgroundImageString, setCssBackgroundImageString] = useState<string>('')

  const updateScreen = async () => {
    if (screenName && !isNew) {
      try {
        setIsLoading(true)
        const file = await getFile(screenName)
        setSha(file.sha)
        const appConfig = JSON.parse(file.content) as ScreenConfig
        setTheatreId(appConfig.TheatreId)
        setLoggingEnabled(appConfig.LoggerEnabled)
        setScheduleDay(appConfig.DayOffset)
        setHighlightedMovieName(appConfig.HighlightedMovieName || '')
        setIsAdvertisementEnabled(appConfig.IsAdvertisementEnabled || false)
        setVerticalVideoLink(appConfig.VerticalVideoLink || '')
        setHorizontalVideoLink(appConfig.HorizontalVideoLink || '')
        setCssBackgroundImageString(appConfig.cssBackgroundString || '')
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    updateScreen()
  }, [screenName, isNew])

  // Function to handle saving the changes to the external API
  async function handleSave() {
    const newScreenConfig: ScreenConfig = {
      LoggerEnabled: loggingEnabled,
      DayOffset: scheduleDay,
      TheatreId: theatreId,
      HighlightedMovieName: highlightedMovieName,
      IsAdvertisementEnabled: isAdvertisementEnabled,
      HorizontalVideoLink: horizontalVideoLink,
      VerticalVideoLink: verticalVideoLink,
      cssBackgroundString: cssBackgroundImageString
    }
    await onSave(JSON.stringify(newScreenConfig), sha)
    await updateScreen()
  }
  async function handleDelete() {
    const confirmed = confirm(`Действительно удалить ${screenName}?`)
    if (!confirmed) return
    await onDelete(sha)
  }

  if (!screenName) {
    return <span className="select-screen-message">Выберите экран</span>
  }
  if (isLoading) {
    return <span className="select-screen-message">Загрузка...</span>
  }

  function onSelectTheatre(theatreId: string) {
    setTheatreId(theatreId)
  }

  function onSelectDayOffset(dayOffset: string) {
    setScheduleDay(parseInt(dayOffset))
  }

  const handleIsAdvertisementEnabledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdvertisementEnabled(e.target.checked)
  }

  // Render the component
  return (
    <div className="screen-form-container">
      {/* Render the cinema ID and schedule day selection form */}
      <form className="screen-form">
        <label htmlFor="cinemaId">Выберите кинотеатр:</label>
        <Select
          className="editor-selector"
          options={theatreOptions}
          onChange={newValue => onSelectTheatre(newValue!.value)}
          isSearchable={false}
          value={theatreOptions.find(value => value.value === theatreId)}
        />
        <label htmlFor="scheduleDay">Выберите день:</label>

        <Select
          className="editor-selector"
          options={daysOffsetOptions}
          onChange={newValue => onSelectDayOffset(newValue!.value)}
          isSearchable={false}
          value={daysOffsetOptions.find(value => value.value == scheduleDay.toString())}
        />
        <label>Выделить, если содержит:</label>

        <input type="text" value={highlightedMovieName} onChange={e => setHighlightedMovieName(e.target.value)} />

        <label>Настройка фона (CSS background-image):</label>

        <textarea
          className="editor-background-setting"
          value={cssBackgroundImageString}
          onChange={e => setCssBackgroundImageString(e.target.value)}
        />

        <label className="adv-checkbox-container">
          Показывать рекламу
          <input
            className="adv-checkbox"
            type="checkbox"
            checked={isAdvertisementEnabled}
            onChange={handleIsAdvertisementEnabledChange}
          />
        </label>
        {isAdvertisementEnabled && <label>Ссылка на вертикальное видео:</label>}
        {isAdvertisementEnabled && (
          <input type="text" value={verticalVideoLink} onChange={e => setVerticalVideoLink(e.target.value)} />
        )}
        {isAdvertisementEnabled && <label>Ссылка на горизонтальное видео:</label>}
        {isAdvertisementEnabled && (
          <input type="text" value={horizontalVideoLink} onChange={e => setHorizontalVideoLink(e.target.value)} />
        )}
      </form>

      <button className="save-button" type="button" onClick={handleSave}>
        Сохранить
      </button>
      <button className="delete-button" type="button" onClick={handleDelete}>
        Удалить
      </button>
    </div>
  )
}
