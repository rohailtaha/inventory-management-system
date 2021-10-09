function Sale({ product, quantity, amount, salesProfit }) {
  return (
    <tr>
      <td>{product}</td>
      <td>{quantity}</td>
      <td>{amount}</td>
      <td>{salesProfit}</td>
    </tr>
  );
}

export default Sale;
