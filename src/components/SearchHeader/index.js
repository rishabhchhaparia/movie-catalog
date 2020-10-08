import React from 'react';
import ClickOutsideHandler from '../ClickOutsideHandler';
import './style.css'

const SearchHeader = (props) => {
  return <div className='header'>
    <h2 className='title'>
      <i className="fas fa-film"></i>
      My WatchList</h2>
    <div className='desc'>Search to add Movies or TV Shows to your WatchList</div>
    <div className='searchBox'>
      <ClickOutsideHandler handleClickOutside={props.closeSearch}>
        <input name='searchInput' value={props.searchVal} className='searchInput' onChange={props.handleSearchTextChange}
          placeholder="Search for a movie or TV show" />
        <i className="fas fa-plus" />
        {
          props.searchCalled ?
            <i className='far fa-times-circle' onClick={props.closeSearch} /> :
            null
        }
      </ClickOutsideHandler>
    </div>
  </div>
}

export default SearchHeader;