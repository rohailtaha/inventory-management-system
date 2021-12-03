import { useState } from 'react';
import { orders } from '../../../utils/util_structures';

export default function SortArrows({ sort, aKey }) {
  const [sortOrder, setSortOrder] = useState(orders.ASC);

  const handleClick = () => {
    sort(aKey, sortOrder);
    sortOrder === orders.ASC
      ? setSortOrder(orders.DESC)
      : setSortOrder(orders.ASC);
  };

  return (
    <button
      className='sort-arrows p-0 bg-transparent border-0'
      onClick={handleClick}
    >
      <div className='material-icons sort-arrow' id='sort-arrow--up'>
        arrow_drop_down
      </div>{' '}
      <div className='material-icons sort-arrow' id='sort-arrow--down'>
        arrow_drop_down
      </div>{' '}
    </button>
  );
}
