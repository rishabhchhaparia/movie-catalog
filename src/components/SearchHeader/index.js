import React from 'react';
import './style.css'

const SearchHeader = (props) => {
  return <div className='header'>
    <h2 className='title'>My WatchList</h2>
    <div className='desc'>Search to add Movies or TV Shows to your WatchList</div>
    <div className='searchBox'>
      <input name='searchInput' value={props.searchVal} className='searchInput' onChange={props.handleSearchTextChange}
        placeholder="Search for a movie or TV show" />
      <i className="fas fa-plus"></i>
    </div>
  </div>
}

export default SearchHeader;