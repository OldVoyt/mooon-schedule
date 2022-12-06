import './TopPanel.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogoSvg = () => (
  <svg width="324" height="80" viewBox="0 0 324 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M179.352 59.9231C195.9 59.9231 209.314 46.5089 209.314 29.9616C209.314 13.4143 195.9 0 179.352 0C162.805 0 149.391 13.4143 149.391 29.9616C149.391 46.5089 162.805 59.9231 179.352 59.9231Z"
      fill="white"
    />
    <path
      d="M88.1445 30C88.1445 12.3443 101.281 0 118.006 0C134.732 0 147.868 12.3443 147.868 30C147.868 47.6556 134.739 60 118.006 60C101.281 59.9923 88.1445 47.648 88.1445 30ZM136.331 30C136.331 18.3474 128.045 10.6149 118.006 10.6149C107.968 10.6149 99.6818 18.3474 99.6818 30C99.6818 41.6526 107.968 49.3851 118.006 49.3851C128.045 49.3851 136.331 41.6526 136.331 30Z"
      fill="white"
    />
    <path
      d="M210.707 30C210.707 12.3443 223.835 0 240.569 0C257.294 0 270.43 12.3443 270.43 30C270.43 47.6556 257.302 60 240.569 60C223.835 59.9923 210.707 47.648 210.707 30ZM258.885 30C258.885 18.3474 250.599 10.6149 240.561 10.6149C230.523 10.6149 222.237 18.3474 222.237 30C222.237 41.6526 230.523 49.3851 240.561 49.3851C250.599 49.3851 258.885 41.6526 258.885 30Z"
      fill="white"
    />
    <path
      d="M302.14 0C294.684 0 288.373 2.96695 284.338 9.02383H284.1V1.15296H272.562V58.8394H284.1V27.1714C284.1 15.7494 290.195 10.146 298.396 10.146C307.051 10.146 312.025 14.7425 312.025 26.1645V58.8317H323.562V24.0354C323.554 7.07148 314.761 0 302.14 0Z"
      fill="white"
    />
    <path
      d="M65.319 0C57.0869 0 50.6226 2.92083 46.4028 9.8847H46.2106C41.3836 2.62106 36.7025 0 28.578 0C21.9293 0 15.0269 3.12068 11.691 8.80861H11.5373V1.15296H0V58.8394H11.5373V25.7264C11.5373 15.342 16.6026 10.1537 24.3351 10.1537C32.0677 10.1537 37.1253 14.6733 37.1253 25.0576V58.8394H48.6626V26.2337C48.6626 15.8493 53.7279 10.1537 61.5757 10.1537C69.3083 10.1537 74.0892 14.6733 74.0892 25.0576V58.8394H85.6265V23.4204C85.6265 7.61722 76.9716 0 65.319 0Z"
      fill="white"
    />
  </svg>
)

const CurrentDateTime = (currentDateTime: Date | null) => {
  const navigate = useNavigate()

  return (
    <div className="date-time-container">
      {currentDateTime && (
        <span className="date-string">{`${currentDateTime.toLocaleString('ru-RU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}`}</span>
      )}
      <div className="time-settings-button-container">
        <button className="settings-button" onClick={() => navigate('/settings')}>
          ...
        </button>
        {currentDateTime && (
          <span className="time-string">{`${currentDateTime.getHours().toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })}:${currentDateTime.getMinutes().toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          })}`}</span>
        )}
      </div>
    </div>
  )
}

const TheatreName = (theatreName: string) => {
  return <span className="theatre-name">{theatreName}</span>
}

export const TopPanel = (currentDateTime: Date | null, theatreName?: string) => {
  return (
    <div className="logo">
      <div className="logo-name-time-container">
        {LogoSvg()}
        {TheatreName(theatreName ?? '')}
        {CurrentDateTime(currentDateTime)}
      </div>
      <svg width="1080" height="1" viewBox="0 0 1080 1" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.5" y1="0.5" x2="1079.5" y2="0.500094" stroke="url(#paint0_linear_1_2486)" strokeLinecap="round" />
        <defs>
          <linearGradient
            id="paint0_linear_1_2486"
            x1="1080"
            y1="1.99988"
            x2="-8.7404e-08"
            y2="1.99979"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#262626" stopOpacity="0" />
            <stop offset="0.473958" stopColor="#262626" />
            <stop offset="1" stopColor="#262626" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
