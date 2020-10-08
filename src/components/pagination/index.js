import React from 'react';
import './style.css';

const PaginationComponent = ({ data, pageChangehandler }) => {

  return <div className='pagination'>
    {
      data.currentPage === 1 ?
        null :
        <button className='linkBtn' onClick={() => pageChangehandler(data.currentPage - 1)}>Up</button>
    }
    {
      data.currentPage === data.pages ?
        null :
        <button className='linkBtn' onClick={() => pageChangehandler(data.currentPage + 1)}>Next</button>
    }
    <div>Page Number: {data.currentPage}</div>
  </div>
}

export default PaginationComponent;