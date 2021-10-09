import HighestSellingProduct from './HighestSellingProduct';

function HighestSellingProductsTable() {
  return (
    <table className='table table-sm'>
      <thead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Total Sales</th>
          <th scope='col'>Income</th>
        </tr>
      </thead>
      <tbody>
        {HighestSellingProducts.map((product,index) => (
          <HighestSellingProduct
            name={product.name}
            totalSales={product.totalSales}
            income={product.income}
            key={index}
          />
        ))}
      </tbody>
    </table>
  );
}

const HighestSellingProducts = [
  { name: 'product 1', totalSales: 50, income: 400 },
  { name: 'product 2', totalSales: 70, income: 450 },
  { name: 'product 3', totalSales: 20, income: 600 },
];

export default HighestSellingProductsTable;
