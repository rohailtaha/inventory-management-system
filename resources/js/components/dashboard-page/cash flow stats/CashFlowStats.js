import { useSelector } from 'react-redux';

function CashFlowStats() {
  const [purchases, sales] = useSelector(state => [
    state.purchases.list,
    state.sales.list,
  ]);

  const totalPurchases = () =>
    purchases.reduce((total, purchase) => total + purchase.amount_paid, 0);

  const totalSales = () =>
    sales.reduce((total, sale) => total + sale.net_payment, 0);

  return (
    <section className='stats'>
      <h2 className='mt-5 fw-bold'>Cash Flow</h2>
      <div className='grid'>
        <div className='card border-0'>
          <div className='card-body ps-0'>
            <h5 className='card-title'>Total Purchases</h5>
            <span className='card-text'>Rs {totalPurchases()}</span>
          </div>
        </div>
        <div className='card border-0'>
          <div className='card-body ps-0'>
            <h5 className='card-title'>Total Sales</h5>
            <span className='card-text'> Rs {totalSales()}</span>
          </div>
        </div>
        <div className='card border-0'>
          <div className='card-body ps-0'>
            <h5 className='card-title'>Sales Profit</h5>
            <span className='card-text'>
              Rs {(totalSales() - totalPurchases()).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CashFlowStats;
