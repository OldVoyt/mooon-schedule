import { Show } from '../../types/ScheduleTypes'
import MovieCard from '../MovieCard/MovieCard'
import './MoviesList.css'
import React from 'react'

const is30MinutesAfterShow = (show: Show) => {
  const date = new Date(show.dttmShowStart)
  const now = new Date()
  if (now < date) {
    return true
  }
  const difference = now.getTime() - date.getTime() // This will give difference in milliseconds
  const resultInMinutes = Math.round(difference / 60000)
  return resultInMinutes > 30
}

export const MoviesList = (data: Show[] | null) => {
  return data ? (
    <div className="movies-list-wrapper">
      {data
        .filter(value => is30MinutesAfterShow(value))
        .sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return +new Date(a.dttmShowStart) - +new Date(b.dttmShowStart)
        })
        .map(movie => (
          <MovieCard key={movie.ID} {...movie} />
        ))}
    </div>
  ) : (
    <div>Loading</div>
  )
}
