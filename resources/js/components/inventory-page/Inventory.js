import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetch_products } from '../../actions/products/products-actions';
import FilterForm from './filter form/FilterForm';
import InventoryTable from './table/InventoryTable';

function Inventory() {

  const fetched = useSelector(state => state.products.fetched);
  const dispatch = useDispatch();
  useEffect(() => {
    if(!fetched) {
      dispatch(fetch_products());
    }
  }, []);

  return (
    <div className='main__content main__content--inventory'>
      <div className='d-xl-flex align-items-center'>
        <Link className='btn btn-primary me-5 px-3 py-2' to='/add_product'>
          <i className='fas fa-plus me-2'></i> New Product
        </Link>
        <FilterForm />
      </div>

      <section className='mt-3'>
        <div className='card'>
          <div className='card-header fs-2'>Products</div>
          <div className='card-body'>
            <div className='table-responsive'>
              <InventoryTable />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Inventory;
