function AddedSale({
  product,
  salePrice,
  discount,
  discountedSalePrice,
  quantity,
  netTotal,
}) {
  return (
    <tr>
      <td>{product}</td>
      <td>{salePrice}</td>
      <td>{discount}</td>
      <td>{discountedSalePrice}</td>
      <td>{quantity}</td>
      <td>{netTotal}</td>
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

export default AddedSale;
