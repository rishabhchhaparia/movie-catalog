import React from 'react';
import './style.css';

const PaginationComponent = ({ data, pageChangehandler }) => {

  return <div className='pagination'>
    <button className='linkBtn' onClick={() => pageChangehandler(data.currentPage - 1)} disabled={data.currentPage === 1}
      style={data.currentPage === 1 ? { cursor: 'not-allowed' } : {}}>Up</button>
    <button className='linkBtn' onClick={() => pageChangehandler(data.currentPage + 1)} disabled={data.currentPage === data.pages}
      style={data.currentPage === data.pages ? { cursor: 'not-allowed' } : {}}>Next</button>
  </div>
}

export default PaginationComponent;