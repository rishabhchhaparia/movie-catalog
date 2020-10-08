import React, { useEffect, useState } from 'react';
import { fetchDataUrl } from '../../apiConstant/api';
import Loader from '../Loader';
import MovieCard from '../MovieCard';
import PaginationComponent from '../pagination';
import SearchHeader from '../SearchHeader';
import './style.css';

const initialPagination = {
  count: 0,
  pages: 0,
  currentPage: 1
}

const intitialError = {
  hasError: false,
  msg: ''
}

const controller = new AbortController();

const MovieCatalog = (props) => {
  const [movieList, setMovieList] = useState([]);
  const [paginationData, setPaginationData] = useState(initialPagination);
  const [searchCalled, setSearchCalled] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [error, setError] = useState(intitialError)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(1)
  }, [])

  const fetchData = (page, input = 'abc') => {
    fetch(fetchDataUrl(page, input))
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.Response === 'True') {
          let count = parseInt(data.totalResults);
          let pages = Math.ceil(count / data.Search.length);
          setMovieList(data.Search);
          setPaginationData({
            count: count,
            pages: pages,
            currentPage: page
          })
          setError(intitialError)
          setLoading(false);
        }
        else {
          let errMsg = '';
          switch (data.Error) {
            case 'Movie not found!':
              errMsg = <div className='noDataDiv'>
                <div>No movie found matching your current search.</div>
                <div>Try entering a different input to help us fetch better results</div>
              </div>;
              break;
            case 'Too many results.':
              errMsg = <div className='noDataDiv'>
                <div>Your current search returned too many results for us to display.</div>
                <div>Please enter a few more characters to shorten the list.</div>
              </div>;
              break;
            default:
              errMsg = <div className='noDataDiv'>
                <div>Please enter a few characters to search.</div>
              </div>
              break;
          }
          setError({
            hasError: true,
            msg: errMsg
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

  const handleSearchTextChange = event => {
    let val = event.target.value;
    setSearchVal(val);
    controller.abort();
    updateSearchResult(val);
  }

  const updateSearchResult = input => {
    setSearchCalled(true);
    setLoading(true);
    fetchData(1, input);
  }

  const closeSearch = () => {
    if (searchCalled) {
      setSearchCalled(false);
      setSearchVal('')
      setLoading(true);
      fetchData(1);
    }
  }

  const pageChangehandler = nextPage => {
    setLoading(true);
    if (searchCalled) {
      fetchData(nextPage, searchVal)
    }
    else {
      fetchData(nextPage)
    }
  }

  return <>
    <SearchHeader handleSearchTextChange={handleSearchTextChange} searchVal={searchVal} closeSearch={closeSearch}
      searchCalled={searchCalled} totalResults={error.hasError ? null : paginationData.count} />
    <div className='movieCatalog'>
      {
        loading ?
          <div className="noDataDiv">
            <Loader />
          </div> :
          error.hasError === true ?
            error.msg :
            <>
              <PaginationComponent data={paginationData} pageChangehandler={pageChangehandler} />
              <div className='movieList'>
                {
                  movieList.map(item => <MovieCard data={item} key={item.imdbID} />)
                }
              </div>
            </>
      }
    </div>
  </>
}

export default MovieCatalog;