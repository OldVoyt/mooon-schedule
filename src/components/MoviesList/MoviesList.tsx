import {SchedulePageState} from '../../types/ScheduleTypes'
import MovieCard from '../MovieCard/MovieCard'
import './MoviesList.css'
import React from 'react'

export const MoviesList = (pageState: SchedulePageState) => {
  return pageState.shows ? (
    <div className="movies-list-wrapper">
      {pageState.shows.map(movie => (
        <MovieCard key={movie.ID} show={movie} highlightedMovieName={pageState.config?.HighlightedMovieName} />
      ))}
    </div>
  ) : (
    <div>Loading</div>
  )
}
