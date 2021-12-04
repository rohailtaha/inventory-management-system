import { useDispatch } from 'react-redux';
import { delete_product_from_purchase } from '../../../../actions/purchases/purchases-actions';
import { numericString } from '../../../../utils/utility_functions';

function AddedProduct({ id, name, quantity, purchasePrice, totalCost }) {
  const dispatch = useDispatch();

  const remove = () => dispatch(delete_product_from_purchase(id));

  return (
    <tr>
      <td>{name}</td>
      <td>{numericString(purchasePrice)}</td>
      <td>{quantity}</td>
      <td>{numericString(totalCost)}</td>
      <td>
        <button
          className='btn text-danger p-0'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='Delete'
          onClick={remove}
        >
          <span className='material-icons'>remove_circle</span>
        </button>
      </td>
    </tr>
  );
}

export default AddedProduct;
