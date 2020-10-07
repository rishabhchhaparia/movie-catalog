import React from 'react';
import './style.css';

const MovieCard = ({ data }) => {
  return <div className='CardItem'>
    <div className='details'>
      <img src={data.Poster} className='poster' alt={data.Title} />
      <div className='text'>
        <div className='name'>{data.Title}</div>
        <div className='info'>{data.Year} - {data.Type}</div>
      </div>
    </div>
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