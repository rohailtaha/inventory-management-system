import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { show_delete_confirmation } from '../../../actions/delete-confirmation/delete-confirmation-actions';

function Product({
  id,
  barcode,
  name,
  category,
  quantity,
  purchasePrice,
  finalSalePrice,
}) {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{barcode}</td>
      <td>{name}</td>
      <td>{category}</td>
      <td>{quantity}</td>
      <td>{purchasePrice}</td>
      <td>{finalSalePrice}</td>
      <td>
        <Link
          to={`/edit-product/${id}`}
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

export default Product;
