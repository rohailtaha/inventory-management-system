import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { hide_delete_confirmation } from '../../actions/delete-confirmation/delete-confirmation-actions';
import { reset_pagination } from '../../actions/pagination/pagination-actions';
import { request_delete_product } from '../../actions/products/products-actions';
import { hide_success_message } from '../../actions/success-message/success-message-actions';
import Paginaton from '../common/pagination/Pagination';
import FilterForm from './filter form/FilterForm';
import InventoryTable from './table/InventoryTable';

function Inventory() {
  const [fetched, deleteConfirmation, products] = useSelector(state => [
    state.products.fetched,
    state.deleteConfirmation,
    state.products.list,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (deleteConfirmation.confirm)
      dispatch(request_delete_product(deleteConfirmation.deleteID));
  }, [deleteConfirmation.confirm]);

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(hide_success_message());
    dispatch(hide_delete_confirmation());
    dispatch(reset_pagination());
  };

  return (
    <div className='main__content main__content--inventory'>
      <div className='d-xl-flex align-items-center'>
        <Link
          className='btn btn-primary me-5 px-3 py-2 d-flex align-items-center add-btn'
          to='/add-product'
        >
          <span className='material-icons me-1'> add </span>{' '}
          <span> New Product </span>{' '}
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
        {fetched && <Paginaton totalItems={products.length} />}
      </section>
    </div>
  );
}

export default Inventory;
