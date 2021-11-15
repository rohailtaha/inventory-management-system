import React from 'react';
import CashFlowStats from './cash flow stats/CashFlowStats';
import InventoryStats from './inventory stats/InventoryStats';
import HighestSellingProductsTable from './tables/highest selling products/HighestSellingProductsTable';

function Dashboard() {
  return (
    <div className='main__content main__content--dashboard'>
      <InventoryStats />
      <hr />
      <CashFlowStats />
      <hr />

      <section className='mt-5'>
        <div className='card'>
          <div className='card-header'>Highest Selling Products</div>
          <div className='card-body'>
            <div className='table-responsive'>
              <HighestSellingProductsTable />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
