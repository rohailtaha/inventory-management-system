export default function Product({ name, perItemCost, quantity, totalCost }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{perItemCost}</td>
      <td>{quantity}</td>
      <td>{totalCost}</td>
    </tr>
  );
}
