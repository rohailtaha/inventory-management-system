import { useDispatch } from 'react-redux';
import { set_current_page } from '../../../../../actions/pagination/pagination-actions';

export default function PreviousPageButton({ currentPage, disabled }) {
  const dispatch = useDispatch();

  return (
    <li>
      <button
        className={`page${
          disabled ? '' : ' page--clickable'
        } btn btn-secondary d-flex px-1 mx-0`}
        onClick={() => dispatch(set_current_page(currentPage - 1))}
        disabled={disabled}
        style={{ cursor: `${disabled ? 'auto' : 'pointer'}` }}
      >
        <span className='material-icons'>arrow_back</span>
      </button>
    </li>
  );
}
