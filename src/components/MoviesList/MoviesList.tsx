import { CachedScheduleData, SchedulePageState } from '../../types/ScheduleTypes'
import MovieCard from '../MovieCard/MovieCard'
import './MoviesList.css'
import React from 'react'

export const MoviesList = (pageState: CachedScheduleData) => {
  return pageState.shows ? (
    <div className="movies-list-wrapper">
      {pageState.shows.map(movie => (
        <MovieCard key={movie.ID} show={movie} highlightedMovieName={pageState?.HighlightedMovieName} />
      ))}
    </div>
  ) : (
    <div>Loading</div>
  )
}
