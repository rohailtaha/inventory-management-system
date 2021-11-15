import { useDispatch } from 'react-redux';
import { set_current_page } from '../../../../actions/pagination/pagination-actions';

export default function Page({ pageNumber, active }) {
  const dispatch = useDispatch();

  return (
    <li>
      <button
        className={`page page--clickable${
          active ? ' active-page' : ''
        } btn btn-sm btn-secondary mx-0`}
        onClick={() => dispatch(set_current_page(pageNumber))}
      >
        {pageNumber}
      </button>
    </li>
  );
}
