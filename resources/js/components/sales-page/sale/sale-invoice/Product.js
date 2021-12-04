import { numericString } from '../../../../utils/utility_functions';

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
      <td>{numericString(perItemPrice)}</td>
      <td>{numericString(discount)}</td>
      <td>{numericString(finalSalePrice)}</td>
      <td>{quantity}</td>
      <td>{numericString(totalPrice)}</td>
    </tr>
  );
}
