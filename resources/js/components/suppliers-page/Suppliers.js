import { Link } from 'react-router-dom';
import SuppliersTable from './table/SuppliersTable';

function Suppliers() {
  return (
    <div className='main__content main__content--suppliers'>
      <div className='d-xl-flex align-items-center'>
        <Link className='btn btn-primary px-3 py-2 d-flex align-items-center add-btn' to='/add_supplier'>
          <span className='material-icons me-1'> add </span> Add New Supplier
        </Link>
      </div>

      <section className='mt-5 table-container'>
        <div className='card'>
          <div className='card-header fs-2'>Suppliers</div>
          <div className='card-body'>
            <div className='table-responsive'>
              <SuppliersTable />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Suppliers;
