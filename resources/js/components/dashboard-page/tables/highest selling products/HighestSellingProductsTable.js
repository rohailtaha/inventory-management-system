import { useSelector } from 'react-redux';
import HighestSellingProduct from './HighestSellingProduct';

const RECORDS_LIMIT = 3;

function HighestSellingProductsTable() {
  const [highestSellingProducts] = useSelector(state => [
    state.sales.highestSellingProducts,
  ]);

  return (
    <table className='table table-sm'>
      <thead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Total Sales</th>
          <th scope='col'>Income (RS)</th>
        </tr>
      </thead>
      <tbody>
        {highestSellingProducts.slice(0, RECORDS_LIMIT).map(product => (
          <HighestSellingProduct
            key={product.id}
            name={product.name}
            totalSales={product.total_sales}
            income={product.income}
          />
        ))}
      </tbody>
    </table>
  );
}

export default HighestSellingProductsTable;
