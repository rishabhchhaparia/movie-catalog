import React, { useEffect, useState } from 'react';
import './style.css';
import { useRouteMatch, Link } from 'react-router-dom'
import { fetchMovieDetailUrl } from '../../apiConstant/api';
import Loader from '../Loader';
import { initCap } from '../../utils';

const initialError = {
  hasError: false,
  msg: ''
}

const MovieDetail = props => {
  const match = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(false);
  const [error, setError] = useState(initialError);

  useEffect(() => {
    const id = match.params.movieId;
    fetchMovieData(id);
  }, [match.params.movieId])

  const fetchMovieData = id => {
    fetch(fetchMovieDetailUrl(id))
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.Response === 'True') {
          setData(data);
          setLoading(false);
        }
        else {
          let errorMsg = ''
          switch (data.Error) {
            case 'Incorrect IMDb ID.':
              errorMsg = <div className='noDataDiv'>
                <div>Incorrect ID</div>
                <div>The ID in your url does not match any movie or TV show in the database.</div>
              </div>
              break;
            default:
              errorMsg = <div className='noDataDiv'>
                <div>Something went wrong!</div>
                <div>Please refresh the page or try after sometime if the issue persists</div>
              </div>
              break;
          }
          setError({
            hasError: true,
            msg: errorMsg
          })
          setLoading(false);
        }
      })
      .catch(error => {
        console.log('error: ', error);
        setError({
          hasError: true,
          msg: <div className='noDataDiv'>
            <div>Something went wrong!</div>
            <div>Please refresh the page or try after sometime if the issue persists</div>
          </div>
        })
        setLoading(false);
      })
  }

  return <div className='movieDetail'>
    <Link to='/'>
      <button className='backButton'>Back</button>
    </Link>
    {
      loading ?
        <div className="noDataDiv">
          <Loader />
        </div> :
        error.hasError === true ?
          error.msg :
          <div className='movieData'>
            <div className='poster'>
              <img src={data.Poster} alt={data.Title} />
            </div>
            <div className='movieInfo'>
              <h2 className='title'>{data.Title}</h2>
              <div>
                <span className='label'>IMDB Rating: </span> {data.imdbRating}, Rated by {data.imdbVotes} users
              </div>
              <div className='label'>{data.Genre}</div>
              <div className='label'>{data.Language}</div>
              <div>{data.Plot}</div>
              <div><span className='label'>Director: </span>{data.Director}</div>
              <div><span className='label'>Major Cast: </span>{data.Actors}</div>
              <div><span className='label'>Release Date: </span>{data.Released}</div>
              <div><span className='label'>Duration: </span>{data.Runtime}</div>
              <div><span className='label'>Type: </span>{initCap(data.Type)}</div>
              <div><span className='label'>Year: </span>{data.Year} {data.totalSeasons ? `(${data.totalSeasons} seasons)` : ''}</div>
            </div>
          </div>
    }
  </div>
}

export default MovieDetail;