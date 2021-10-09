import { Link } from 'react-router-dom';
import PurchasesTable from './table/PurchasesTable';

function Purchases() {
  return (
    <div className='main__content main__content--suppliers'>
      <div className='d-xl-flex align-items-center'>
        <Link className='btn btn-primary px-3 py-2' to='/add_purchase'>
          <i className='fas fa-plus me-2'></i> New Purchase
        </Link>
      </div>

      <section className='mt-5 table-container'>
        <div className='card'>
          <div className='card-header fs-2'>Purchases</div>
          <div className='card-body'>
            <div className='table-responsive'>
              <PurchasesTable />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Purchases;
