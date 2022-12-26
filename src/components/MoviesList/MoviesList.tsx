import { Show } from '../../types/ScheduleTypes'
import MovieCard from '../MovieCard/MovieCard'
import './MoviesList.css'
import React from 'react'

export const MoviesList = (data: Show[] | null) => {
  return data ? (
    <div className="movies-list-wrapper">
      {data.map(movie => (
        <MovieCard key={movie.ID} {...movie} />
      ))}
    </div>
  ) : (
    <div>Loading</div>
  )
}
