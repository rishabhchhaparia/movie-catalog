import React from 'react';
import './style.css';
import { Link } from 'react-router-dom'

const MovieCard = ({ data }) => {

  return <div className='CardItem'>
    <Link to={data.imdbID}>
      <div className='details'>
        <img src={data.Poster} className='poster' alt={data.Title} />
        <div className='text'>
          <div className='name'>{data.Title}</div>
          <div className='info'>{data.Year} - {data.Type}</div>
        </div>
      </div>
    </Link>
    <div className='watchlist'>
      <div className='add'>
        <i className="fas fa-check"></i>
        <span>Watched</span>
      </div>
      <div className='remove'>
        <i className="fas fa-times-circle"></i>
      </div>
    </div>
  </div>
}

export default MovieCard;