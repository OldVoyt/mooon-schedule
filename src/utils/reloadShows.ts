import { XMLParser } from 'fast-xml-parser'
import { PollingConfig, SchedulePageState, Show } from '../types/ScheduleTypes'
import { ILogger } from '../hooks/useLogger'

export const prepareShowsForRender = (shows: Show[], currentRequestTime: Date) =>
  shows
    .filter(
      value => new Date(new Date(value.dttmShowStart).getTime() + value.LengthInMinutes * 60000) > currentRequestTime
    )
    .sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return +new Date(a.dttmShowStart) - +new Date(b.dttmShowStart)
    })

const updateExistingShows = (
  pageState: SchedulePageState,
  setData: (value: SchedulePageState) => void,
  showsFromApi: Show[],
  currentRequestTime: Date
) => {
  //console.log(pageState)
  if (!pageState.shows) {
    setData({
      ...pageState,
      shows: prepareShowsForRender(showsFromApi, currentRequestTime),
      lastScheduleUpdatedTime: currentRequestTime
    })
    return
  }

  // Create a new array for the updated shows
  const updatedShows: Show[] = []

  for (const show of pageState.shows) {
    if (new Date(show.dttmShowStart) < new Date(new Date(currentRequestTime).getTime() + 11 * 60000)) {
      updatedShows.push(show)
    }
  }

  // Loop through the data from the API
  for (const apiShow of showsFromApi) {
    // Check if the show is already in the new array
    const showExists = updatedShows.some(show => show.ID === apiShow.ID)

    // If the show is not in the new array, add it
    if (!showExists) {
      updatedShows.push(apiShow)
    }
  }

  setData({
    ...pageState,
    lastScheduleUpdatedTime: currentRequestTime,
    shows: prepareShowsForRender(updatedShows, currentRequestTime)
  })
}

export const reloadShows = async (
  setData: (value: SchedulePageState) => void,
  pollingConfig: PollingConfig,
  logger: ILogger
) => {
  const localPageState = localStorage.getItem('schedulePageState')
  const pageState: SchedulePageState = localPageState ? JSON.parse(localPageState) : {}
  const currentTime = new Date()
  if (
    pageState.lastScheduleUpdatedTime &&
    (currentTime.getTime() - new Date(pageState.lastScheduleUpdatedTime).getTime()) / (1000 * 60) < 15
  ) {
    return
  }
  const url = `https://soft.silverscreen.by:8443/wssite/webapi/xml?mode=showtimes&date=${currentTime.getFullYear()}-${
    currentTime.getMonth() + 1
  }-${currentTime.getDate() + pollingConfig.DayOffset}&theater=${pollingConfig.Theatre.Id}`
  logger.logInfo('start fetching ' + url)

  await fetch(url)
    .then(resp => {
      logger.logInfo('fetched successfully.')
      return resp.text()
    })
    .then(text => new XMLParser().parse(text))
    .then(value => {
      try {
        if (Array.isArray(value.Schedule.Shows.Show)) {
          updateExistingShows(pageState, setData, value.Schedule.Shows.Show, currentTime)
        } else {
          updateExistingShows(pageState, setData, [value.Schedule.Shows.Show], currentTime)
        }
      } catch (e) {
        updateExistingShows(pageState, setData, [], currentTime)
      }
    })
}
