import React from 'react';
import useProducts from '../../hooks/useProducts';
import usePurchases from '../../hooks/usePurchases';
import useSales from '../../hooks/useSales';
import CashFlowStats from './cash flow stats/CashFlowStats';
import InventoryStats from './inventory stats/InventoryStats';
import HighestSellingProductsTable from './tables/highest selling products/HighestSellingProductsTable';

function Dashboard() {
  useProducts();
  useSales();
  usePurchases();

  return (
    <div className='main__content main__content--dashboard'>
      <InventoryStats />
      <hr />
      <CashFlowStats />
      <hr />

      <section className='mt-5 border'>
        <div className='bg-light py-2 px-3 border-bottom'>
          <h4 className='fw-normal'> Highest Selling Products </h4>
        </div>
        <HighestSellingProductsTable />
      </section>
    </div>
  );
}

export default Dashboard;
