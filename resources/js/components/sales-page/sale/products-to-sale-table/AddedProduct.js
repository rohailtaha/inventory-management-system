export default function AddedProduct({
  id,
  name,
  perItemPrice,
  discount,
  discountedSalePrice,
  quantity,
  totalPrice,
}) {
  return (
    <tr>
      <td>{name}</td>
      <td>{perItemPrice}</td>
      <td>{discount}</td>
      <td>{discountedSalePrice}</td>
      <td>{quantity}</td>
      <td>{totalPrice}</td>
      <td>
        <button
          className='btn btn-danger bg-transparent border-0 btn-sm p-'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          title='Delete'
        >
          <i className='fas fa-minus-circle text-danger fs-5 action-icon'></i>
        </button>{' '}
      </td>
    </tr>
  );
}
