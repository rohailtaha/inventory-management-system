import { useDispatch, useSelector } from 'react-redux';
import { set_items_per_page } from '../../../actions/pagination/pagination-actions';
import { rowsPerPage } from '../../../utils/util_structures';
import RowsPerPageOption from './RowsPerPageOption';

export default function RowsPerPage() {
  const [rows] = useSelector(state => [state.pagination.itemsPerPage]);

  const dispatch = useDispatch();

  const handleChange = event => {
    dispatch(set_items_per_page(parseInt(event.target.value)));
  };

  return (
    <div className='rows-per-page d-flex align-items-center'>
      {' '}
      <label htmlFor='rows' className='text-nowrap'>
        {' '}
        Rows Per Page{' '}
      </label>{' '}
      <select
        className='form-select form-select-sm ms-2'
        id='rows'
        name='rows'
        value={rows}
        onChange={handleChange}
        required
      >
        {rowsPerPage.map(value => (
          <RowsPerPageOption key={value} option={value} />
        ))}
      </select>{' '}
    </div>
  );
}
