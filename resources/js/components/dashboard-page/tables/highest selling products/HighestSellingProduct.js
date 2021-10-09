function HighestSellingProduct({ name, totalSales, income }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{totalSales}</td>
      <td>Rs {income}</td>
    </tr>
  );
}

export default HighestSellingProduct;
