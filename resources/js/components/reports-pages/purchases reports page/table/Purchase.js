function Purchase({ date, product, quantity, cost, supplier }) {
  return (
    <tr>
      <td>{date}</td>
      <td>{product}</td>
      <td>{quantity}</td>
      <td>{cost}</td>
      <td>{supplier}</td>
    </tr>
  );
}

export default Purchase;
