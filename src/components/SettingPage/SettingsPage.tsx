import './SettingsPage.css'
import React, { useState } from 'react'
import { PollingConfig, Theatre } from '../../types/ScheduleTypes'
import { useNavigate } from 'react-router-dom'
import { DaysOffsetAvailable, TheatresAvailable } from '../../types/Settings'
import Select from 'react-select'
import { Options } from 'react-select/dist/declarations/src/types'
import { useCookies } from 'react-cookie'

export interface ISettingsPageProps {
  setPollingConfig: (pollingConfig: PollingConfig | null) => void
  pollingConfig: PollingConfig | null
}

export const SettingsPage = ({ setPollingConfig, pollingConfig }: ISettingsPageProps) => {
  const [_, setCookie] = useCookies(['pollingConfig'])

  const [currentTheatre, setTheatre] = useState<Theatre>({
    Name: TheatresAvailable.find(value => value.Id === pollingConfig?.Theatre?.Id || '19')!.Name,
    Id: pollingConfig?.Theatre?.Id ?? '19'
  })
  const [currentDaysOffset, setDaysOffset] = useState<number>(pollingConfig?.DayOffset ?? 0)
  const navigate = useNavigate()

  const onRunClick = () => {
    const pollingConfig = {
      Theatre: currentTheatre,
      DayOffset: currentDaysOffset
    }
    setPollingConfig(pollingConfig)
    setCookie('pollingConfig', pollingConfig, {
      expires: new Date(2200, 10, 10)
    })
    navigate('/')
  }
  return (
    <div className="settings-container">
      <Logo />
      <SettingsPanel
        currentDaysOffset={currentDaysOffset}
        currentTheatre={currentTheatre}
        setTheatre={setTheatre}
        setDaysOffset={setDaysOffset}
      />
      <ButtonPanel onRunClick={onRunClick} />
    </div>
  )
}
export interface ISettingsPanelProps {
  currentDaysOffset: number
  setDaysOffset: (offset: number) => void
  currentTheatre: Theatre
  setTheatre: (theatre: Theatre) => void
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

const SettingsPanel = ({ setTheatre, currentTheatre, currentDaysOffset, setDaysOffset }: ISettingsPanelProps) => {
  return (
    <div className="settings-panel">
      <div>
        <label>Выбор кинотеатра</label>
        <div className="select">
          <Select
            options={theatreOptions}
            onChange={newValue =>
              setTheatre({
                Id: newValue!.value,
                Name: TheatresAvailable.find(value => value.Id === newValue!.value)!.Name
              })
            }
            isSearchable={false}
            value={theatreOptions.find(value => value.value === currentTheatre.Id)}
          />
        </div>
        <div>{'⠀'}</div>
      </div>
      <div>
        <label>Выбор дня</label>
        <div className="select">
          <Select
            options={daysOffsetOptions}
            onChange={newValue => setDaysOffset(parseInt(newValue!.value))}
            value={daysOffsetOptions.find(value => value.value === currentDaysOffset.toString())}
            placeholder="Select an option"
            isSearchable={false}
          />
        </div>
        <div>{'⠀'}</div>
      </div>
    </div>
  )
}

export interface IButtonPanelProps {
  onRunClick: () => void
}

const ButtonPanel = ({ onRunClick }: IButtonPanelProps) => {
  return (
    <div className="button-panel">
      <button className="run-button" onClick={onRunClick}>
        Запустить
      </button>
    </div>
  )
}

const Logo = () => (
  <svg
    className="settings-logo"
    width="373"
    height="107"
    viewBox="0 0 373 107"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M206.762 70.9181C225.838 70.9181 241.303 55.0426 241.303 35.4591C241.303 15.8756 225.838 0 206.762 0C187.686 0 172.221 15.8756 172.221 35.4591C172.221 55.0426 187.686 70.9181 206.762 70.9181Z"
        fill="white"
      />
      <path
        d="M101.617 35.5045C101.617 14.6094 116.761 0 136.043 0C155.325 0 170.468 14.6094 170.468 35.5045C170.468 56.3997 155.334 71.0091 136.043 71.0091C116.761 71 101.617 56.3906 101.617 35.5045ZM157.168 35.5045C157.168 21.7139 147.616 12.5626 136.043 12.5626C124.47 12.5626 114.918 21.7139 114.918 35.5045C114.918 49.2952 124.47 58.4465 136.043 58.4465C147.616 58.4465 157.168 49.2952 157.168 35.5045Z"
        fill="white"
      />
      <path
        d="M242.908 35.5045C242.908 14.6094 258.043 0 277.333 0C296.615 0 311.759 14.6094 311.759 35.5045C311.759 56.3997 296.624 71.0091 277.333 71.0091C258.043 71 242.908 56.3906 242.908 35.5045ZM298.449 35.5045C298.449 21.7139 288.897 12.5626 277.325 12.5626C265.752 12.5626 256.2 21.7139 256.2 35.5045C256.2 49.2952 265.752 58.4465 277.325 58.4465C288.897 58.4465 298.449 49.2952 298.449 35.5045Z"
        fill="white"
      />
      <path
        d="M348.317 0C339.722 0 332.447 3.51134 327.794 10.6796H327.52V1.36451H314.219V69.6355H327.52V32.1569C327.52 18.6392 334.547 12.0077 344.001 12.0077C353.979 12.0077 359.712 17.4475 359.712 30.9653V69.6264H373.013V28.4455C373.004 8.36899 362.867 0 348.317 0Z"
        fill="white"
      />
      <path
        d="M75.3018 0C65.8116 0 58.3593 3.45676 53.4946 11.6984H53.2731C47.7083 3.10199 42.3119 0 32.9457 0C25.2808 0 17.3235 3.69327 13.4778 10.4249H13.3005V1.36451H0V69.6355H13.3005V30.4468C13.3005 18.1571 19.14 12.0168 28.0543 12.0168C36.9686 12.0168 42.7992 17.3657 42.7992 29.6553V69.6355H56.0998V31.0471C56.0998 18.7575 61.9392 12.0168 70.9864 12.0168C79.9007 12.0168 85.4124 17.3657 85.4124 29.6553V69.6355H98.7129V27.7177C98.7129 9.01486 88.7353 0 75.3018 0Z"
        fill="white"
      />
    </g>
    <path
      d="M241.39 88.688C243.022 88.688 244.43 89.304 245.614 90.536C246.782 91.752 247.366 93.24 247.366 95C247.366 96.776 246.782 98.272 245.614 99.488C244.446 100.704 243.038 101.312 241.39 101.312C239.582 101.312 238.182 100.64 237.19 99.296V105.8H234.598V89H237.19V90.728C238.166 89.368 239.566 88.688 241.39 88.688ZM238.27 97.76C238.99 98.48 239.894 98.84 240.982 98.84C242.07 98.84 242.974 98.48 243.694 97.76C244.414 97.024 244.774 96.104 244.774 95C244.774 93.896 244.414 92.984 243.694 92.264C242.974 91.528 242.07 91.16 240.982 91.16C239.894 91.16 238.99 91.528 238.27 92.264C237.55 92.984 237.19 93.896 237.19 95C237.19 96.088 237.55 97.008 238.27 97.76ZM259.219 90.704V89H261.811V101H259.219V99.272C258.243 100.632 256.843 101.312 255.019 101.312C253.371 101.312 251.963 100.704 250.795 99.488C249.627 98.272 249.043 96.776 249.043 95C249.043 93.224 249.627 91.728 250.795 90.512C251.963 89.296 253.371 88.688 255.019 88.688C256.843 88.688 258.243 89.36 259.219 90.704ZM252.715 97.76C253.435 98.48 254.339 98.84 255.427 98.84C256.515 98.84 257.419 98.48 258.139 97.76C258.859 97.024 259.219 96.104 259.219 95C259.219 93.896 258.859 92.984 258.139 92.264C257.419 91.528 256.515 91.16 255.427 91.16C254.339 91.16 253.435 91.528 252.715 92.264C251.995 92.984 251.635 93.896 251.635 95C251.635 96.088 251.995 97.008 252.715 97.76ZM270.496 101.312C268.688 101.312 267.176 100.704 265.96 99.488C264.76 98.256 264.16 96.76 264.16 95C264.16 93.208 264.76 91.712 265.96 90.512C267.176 89.296 268.688 88.688 270.496 88.688C271.664 88.688 272.728 88.968 273.688 89.528C274.648 90.088 275.368 90.84 275.848 91.784L273.616 93.08C273.344 92.504 272.928 92.056 272.368 91.736C271.824 91.4 271.192 91.232 270.472 91.232C269.416 91.232 268.528 91.592 267.808 92.312C267.104 93.048 266.752 93.944 266.752 95C266.752 96.056 267.104 96.952 267.808 97.688C268.528 98.408 269.416 98.768 270.472 98.768C271.176 98.768 271.808 98.608 272.368 98.288C272.944 97.952 273.376 97.496 273.664 96.92L275.896 98.192C275.384 99.152 274.64 99.912 273.664 100.472C272.704 101.032 271.648 101.312 270.496 101.312ZM277.84 89H288.52V101H285.928V91.448H280.432V101H277.84V89ZM294.072 96.608L300.216 89H302.208V101H299.664V93.368L293.52 101H291.528V89H294.072V96.608ZM310.879 101.312C309.071 101.312 307.559 100.704 306.343 99.488C305.143 98.256 304.543 96.76 304.543 95C304.543 93.208 305.143 91.712 306.343 90.512C307.559 89.296 309.071 88.688 310.879 88.688C312.047 88.688 313.111 88.968 314.071 89.528C315.031 90.088 315.751 90.84 316.231 91.784L313.999 93.08C313.727 92.504 313.311 92.056 312.751 91.736C312.207 91.4 311.575 91.232 310.855 91.232C309.799 91.232 308.911 91.592 308.191 92.312C307.487 93.048 307.135 93.944 307.135 95C307.135 96.056 307.487 96.952 308.191 97.688C308.911 98.408 309.799 98.768 310.855 98.768C311.559 98.768 312.191 98.608 312.751 98.288C313.327 97.952 313.759 97.496 314.047 96.92L316.279 98.192C315.767 99.152 315.023 99.912 314.047 100.472C313.087 101.032 312.031 101.312 310.879 101.312ZM327.469 90.704V89H330.061V101H327.469V99.272C326.493 100.632 325.093 101.312 323.269 101.312C321.621 101.312 320.213 100.704 319.045 99.488C317.877 98.272 317.293 96.776 317.293 95C317.293 93.224 317.877 91.728 319.045 90.512C320.213 89.296 321.621 88.688 323.269 88.688C325.093 88.688 326.493 89.36 327.469 90.704ZM320.965 97.76C321.685 98.48 322.589 98.84 323.677 98.84C324.765 98.84 325.669 98.48 326.389 97.76C327.109 97.024 327.469 96.104 327.469 95C327.469 93.896 327.109 92.984 326.389 92.264C325.669 91.528 324.765 91.16 323.677 91.16C322.589 91.16 321.685 91.528 320.965 92.264C320.245 92.984 319.885 93.896 319.885 95C319.885 96.088 320.245 97.008 320.965 97.76ZM341.17 93.776V89H343.762V101H341.17V96.224H335.674V101H333.082V89H335.674V93.776H341.17ZM349.314 96.608L355.458 89H357.45V101H354.906V93.368L348.762 101H346.77V89H349.314V96.608ZM372.049 96.104H362.497C362.689 97 363.121 97.696 363.793 98.192C364.481 98.688 365.329 98.936 366.337 98.936C367.697 98.936 368.729 98.44 369.433 97.448L371.569 98.696C370.401 100.44 368.649 101.312 366.313 101.312C364.377 101.312 362.801 100.72 361.585 99.536C360.385 98.336 359.785 96.824 359.785 95C359.785 93.224 360.377 91.728 361.561 90.512C362.729 89.296 364.249 88.688 366.121 88.688C367.865 88.688 369.305 89.304 370.441 90.536C371.577 91.768 372.145 93.264 372.145 95.024C372.145 95.344 372.113 95.704 372.049 96.104ZM362.473 93.992H369.529C369.353 93.048 368.953 92.32 368.329 91.808C367.721 91.296 366.977 91.04 366.097 91.04C365.137 91.04 364.337 91.304 363.697 91.832C363.057 92.36 362.649 93.08 362.473 93.992Z"
      fill="white"
    />
    <defs>
      <clipPath id="clip0_32_326">
        <rect width="373" height="71" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
