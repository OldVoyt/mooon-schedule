import React from 'react'
import { Show } from '../../types/ScheduleTypes'
import './MovieCard.css'

const getMinuteLocalized = (minuteNumber: number) => {
  switch (minuteNumber) {
    case 1:
    case 21:
      return 'минуту'
    case 2:
    case 3:
    case 4:
    case 22:
    case 23:
    case 24:
      return 'минуты'
    default:
      return 'минут'
  }
}

const prepareWarning = (show: Show, resultInMinutes: number): string | null => {
  if (Math.abs(resultInMinutes) > 30) {
    return null
  }
  if (resultInMinutes === 0) {
    return null
  }
  if (resultInMinutes < 0) {
    return `через ${-resultInMinutes} ${getMinuteLocalized(-resultInMinutes)}`
  }
  return `идёт ${resultInMinutes} ${getMinuteLocalized(resultInMinutes)}`
}

const line = () => (
  <svg
    className="cards-divider"
    width="450"
    height="1"
    viewBox="0 0 450 1"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="0.5" y1="0.5" x2="449.5" y2="0.5" stroke="url(#paint0_linear_1_602)" strokeLinecap="round" />
    <defs>
      <linearGradient id="paint0_linear_1_602" x1="450" y1="1.99979" x2="0" y2="1.99979" gradientUnits="userSpaceOnUse">
        <stop stopColor="FFFFFF" stopOpacity="1" />
        <stop offset="0.2" stopColor="#FFFFFF" />
      </linearGradient>
    </defs>
  </svg>
)

const label = (labelContent: string) => (
  <div className="show-label">
    <span className="show-label-text">{labelContent}</span>
    <svg width="30" height="16" viewBox="0 0 30 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="29" height="15" rx="2.5" stroke="white" strokeOpacity="0.2" />
    </svg>
  </div>
)

function getPassedMinutes(show: Show): number {
  const date = new Date(show.dttmShowStart)
  const now = new Date()

  const difference = now.getTime() - date.getTime() // This will give difference in milliseconds
  const resultInMinutes = Math.round(difference / 60000)
  return resultInMinutes
}

const Card = (show: Show) => {
  const showDate = new Date(show.dttmShowStart)
  const passedMinutes = getPassedMinutes(show)
  const warning = prepareWarning(show, passedMinutes)
  return (
    <div className={'movie-card-container' + (passedMinutes > 0 ? ' now' : '')}>
      <div className="movie-card">
        <img
          className="show-image"
          src={show.Images.EventLargeImagePortrait}
          alt={show.Images.EventMediumImagePortrait}
        />
        <div className="show-description-container">
          <div className="movie-time-and-auditorium">
            <span className="show-time">{`${showDate.getHours().toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            })}:${showDate.getMinutes().toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            })}`}</span>
            <span className="show-auditorium">{`${show.TheatreAuditorium}`}</span>
            {warning && <span className="show-warn">{`${warning}`}</span>}
          </div>
          <span className="show-name">{`${show.Title}`}</span>
          <div className="show-labels-container">
            {label(show.RatingLabel)}
            {label(show.PresentationMethod)}
            <div>
              <div className="show-genres-container">
                <span className="show-genres">{`${show.Genres}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {line()}
    </div>
  )
}

export default Card
