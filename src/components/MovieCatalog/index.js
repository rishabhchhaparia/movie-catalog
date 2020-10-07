import React, { useEffect, useState } from 'react';
import { fetchDataUrl } from '../../apiConstant/api';
import MovieCard from '../MovieCard';
import PaginationComponent from '../pagination';
import SearchHeader from '../SearchHeader';
import './style.css';

const initialPagination = {
  count: 0,
  pages: 0,
  currentPage: 1
}

const MovieCatalog = (props) => {
  const [movieList, setMovieList] = useState([]);
  const [paginationData, setPaginationData] = useState(initialPagination);
  const [searchCalled, setSearchCalled] = useState(false);
  const [searchVal, setSearchVal] = useState('');


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
        }
        else {
          throw data.Error;
        }
      })
      .catch(error => {
        throw error;
      })
  }

  const handleSearchTextChange = event => {
    let val = event.target.value;
    setSearchVal(val);
    updateSearchResult(val);
  }

  const updateSearchResult = input => {

  }

  const pageChangehandler = nextPage => {
    if (searchCalled) {
      fetchData(nextPage, searchVal)
    }
    else {
      fetchData(nextPage)
    }
  }

  return <>
    <SearchHeader handleSearchTextChange={handleSearchTextChange} searchVal={searchVal} />
    <div className='movieCatalog'>
      <PaginationComponent data={paginationData} pageChangehandler={pageChangehandler} />
      <div className='movieList'>
        {
          movieList.map(item => <MovieCard data={item} />)
        }
      </div>
    </div>
  </>
}

export default MovieCatalog;