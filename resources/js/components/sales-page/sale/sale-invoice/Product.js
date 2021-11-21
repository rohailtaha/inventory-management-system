export default function Product({
  name,
  perItemPrice,
  discount,
  finalSalePrice,
  quantity,
  totalPrice,
}) {
  return (
    <tr>
      <td>{name}</td>
      <td>{perItemPrice}</td>
      <td>{discount}</td>
      <td>{finalSalePrice}</td>
      <td>{quantity}</td>
      <td>{totalPrice}</td>
    </tr>
  );
}
