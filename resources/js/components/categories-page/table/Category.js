import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { show_delete_confirmation } from '../../../actions/delete-confirmation/delete-confirmation-actions';

function Category({ id, name }) {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{name}</td>
      <td>
        <Link
          to={`/categories/${id}/edit`}
          className='btn p-0 me-1'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='Edit'
        >
          <span className='material-icons'>edit</span>
        </Link>
        <button
          onClick={() => dispatch(show_delete_confirmation(id))}
          className='btn p-0'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='Delete'
        >
          <span className='material-icons text-danger'>delete</span>
        </button>
      </td>
    </tr>
  );
}

export default Category;
