import React from 'react';
import { Link } from 'react-router-dom';
import SalesTable from './table/SalesTable';

function Sales() {
  return (
    <div className='main__content main__content--sales'>
      <div className='d-xl-flex align-items-center'>
        <Link className='btn btn-primary px-3 py-2' to='/add_sale'>
          <i className='fas fa-plus me-2'></i> New Sale
        </Link>
      </div>

      <section className='mt-5 table-container'>
        <div className='card'>
          <div className='card-header fs-2'>Sales</div>
          <div className='card-body'>
            <div className='table-responsive'>
              <SalesTable />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sales;
