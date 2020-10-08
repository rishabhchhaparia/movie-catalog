import React from 'react';
import './style.css'

const SearchHeader = (props) => {
  return <div className='header'>
    <h2 className='title'>
      <i className="fas fa-film"></i>
      My WatchList</h2>
    <div className='desc'>Search to add Movies or TV Shows to your WatchList</div>
    <div className='searchBox'>
      <input name='searchInput' value={props.searchVal} className='searchInput' onChange={props.handleSearchTextChange}
        placeholder="Search for a movie or TV show" />
      <i className="fas fa-plus" />
      {
        props.searchCalled ?
          <i className='far fa-times-circle' onClick={props.closeSearch} /> :
          null
      }
    </div>
    {
      props.searchVal.length > 0 && props.totalResults !== null ?
        <div style={{
          position: 'relative',
          top: 50
        }}>Total results: {props.totalResults}</div> :
        null
    }
  </div>
}

export default SearchHeader;