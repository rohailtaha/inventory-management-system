import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { hide_delete_confirmation } from '../../actions/delete-confirmation/delete-confirmation-actions';
import { request_delete_product } from '../../actions/products/products-actions';
import { hide_success_message } from '../../actions/success-message/success-message-actions';
import FilterForm from './filter form/FilterForm';
import InventoryTable from './table/InventoryTable';

function Inventory() {
  const [deleteConfirmation] = useSelector(state => [state.deleteConfirmation]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (deleteConfirmation.confirm)
      dispatch(request_delete_product(deleteConfirmation.deleteID));
  }, [deleteConfirmation.confirm]);

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(hide_success_message());
    dispatch(hide_delete_confirmation());
  };

  return (
    <div className='main__content main__content--inventory'>
      <div className='d-xl-flex align-items-center'>
        <Link className='btn btn-primary me-5 px-3 py-2' to='/add-product'>
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
