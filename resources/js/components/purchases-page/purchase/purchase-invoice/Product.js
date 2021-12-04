import { numericString } from '../../../../utils/utility_functions';

export default function Product({ name, perItemCost, quantity, totalCost }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{numericString(perItemCost)}</td>
      <td>{quantity}</td>
      <td>{numericString(totalCost)}</td>
    </tr>
  );
}
