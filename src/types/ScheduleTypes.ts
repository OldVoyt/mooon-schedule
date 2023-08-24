export type ServerResponse = {
  Schedule: Schedule
}

export type Schedule = {
  Shows: {
    Show: Show[]
  }
}

export type Show = {
  ID: number
  Title: string
  Images: {
    EventLargeImagePortrait: string
    EventMediumImagePortrait: string
  }
  dttmShowStart: string
  Genres: string
  TheatreAuditorium: string
  LengthInMinutes: number
  RatingLabel: string
  PresentationMethod: string
}

export type PollingConfig = {
  configFileName?: string
}

export type ScreenConfig = {
  DayOffset: number
  TheatreId: string
  LoggerEnabled: boolean
  HighlightedMovieName?: string
  IsAdvertisementEnabled?: boolean
  VerticalVideoLink?: string
  HorizontalVideoLink?: string
  cssBackgroundString?: string
}

export type SchedulePageState = {
  configFileName?: string
  lastScheduleUpdatedTime?: Date
  lastConfigUpdatedTime?: Date
  shows?: Show[]
  config?: ScreenConfig
  configFileInfo?: {
    PreviousShaForConfigFile?: string
  }
}

export type Theatre = {
  Id: string
  Name: string
}
export type ScheduleSettings = {
  Name: string
  DayOffset: number
  TheatreId: string
  LoggerEnabled: boolean
  HighlightedMovieName?: string
  cssBackgroundString?: string
}
export type CachedScheduleData = {
  configName: string
  lastUpdatedTime?: Date
  shows?: Show[]
  cssBackgroundString?: string
  TheatreId: string
  HighlightedMovieName?: string
}
