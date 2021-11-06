import { Link } from 'react-router-dom';

function Category({ id, name }) {
  return (
    <tr>
      <td>{name}</td>
      <td>
        <Link
          to={`/edit-category/${id}`}
          className='btn p-0 me-1'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='Edit'
        >
          <span className='material-icons'>edit</span>
        </Link>
        <button
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
