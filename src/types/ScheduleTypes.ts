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
  Theatre: Theatre
  DayOffset: number
  LoggerEnabled?: boolean
}

export type Theatre = {
  Id: string
  Name: string
}

export type SchedulePageState = {
  lastScheduleUpdatedTime?: Date
  shows?: Show[]
}
