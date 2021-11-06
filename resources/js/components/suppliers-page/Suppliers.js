import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { hide_delete_confirmation } from '../../actions/delete-confirmation/delete-confirmation-actions';
import { hide_success_message } from '../../actions/success-message/success-message-actions';
import { request_delete_supplier } from '../../actions/suppliers/suppliers-actions';
import SuppliersTable from './table/SuppliersTable';

function Suppliers() {
  const [deleteConfirmation] = useSelector(state => [state.deleteConfirmation]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (deleteConfirmation.confirm)
      dispatch(request_delete_supplier(deleteConfirmation.deleteID));
  }, [deleteConfirmation.confirm]);

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(hide_success_message());
    dispatch(hide_delete_confirmation());
  };

  return (
    <div className='main__content main__content--suppliers'>
      <div className='d-xl-flex align-items-center'>
        <Link
          className='btn btn-primary px-3 py-2 d-flex align-items-center add-btn'
          to='/add-supplier'
        >
          <span className='material-icons me-1'> add </span> New Supplier
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
