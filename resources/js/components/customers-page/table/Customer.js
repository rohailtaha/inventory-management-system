import { Link } from 'react-router-dom';

function Customer({ name, email, phone, address }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{address}</td>
      <td>
        <Link
          to='/edit_customer'
          className='btn btn-secondary btn-sm me-2 p-1'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='Edit'
        >
          <i className='fas fa-edit action-icon fw-lighter'></i>
        </Link>
        <button
          className='btn btn-danger btn-sm p-1'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='Delete'
        >
          <i className='fas fa-trash-alt action-icon fw-lighter'></i>
        </button>
      </td>
    </tr>
  );
}

export default Customer;
