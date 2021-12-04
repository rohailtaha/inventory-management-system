import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetch_categories } from '../../actions/categories/categories-actions';
import { hide_delete_confirmation } from '../../actions/delete-confirmation/delete-confirmation-actions';
import { reset_pagination } from '../../actions/pagination/pagination-actions';
import {
  fetch_products,
  request_delete_product,
} from '../../actions/products/products-actions';
import { hide_success_message } from '../../actions/success-message/success-message-actions';
import { stringStarts } from '../../utils/utility_functions';
import { userRoles } from '../../utils/util_structures';
import NoResultsMsg from '../common/no-results-msg/NoResultsMsg';
import Paginaton from '../common/pagination/Pagination';
import RowsPerPage from '../common/rows-per-page/RowsPerPage';
import FilterForm from './filter form/FilterForm';
import ProductsTable from './table/ProductsTable';

export default function Products() {
  const [deleteConfirmation, products, searchForm, userRole] = useSelector(
    state => [
      state.deleteConfirmation,
      state.products.list,
      state.products.searchForm,
      state.users.user.role,
    ]
  );

  const filteredProducts = () => {
    if (searchForm.category === 'All') {
      return products.filter(
        product =>
          stringStarts(product.name, searchForm.product) ||
          stringStarts(product.barcode, searchForm.product)
      );
    }
    return products.filter(
      product =>
        product.category === searchForm.category &&
        (stringStarts(product.name, searchForm.product) ||
          stringStarts(product.barcode, searchForm.product))
    );
  };

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
        {userRole === userRoles.ADMIN && (
          <Link
            className='btn btn-primary me-5 px-3 py-2 d-flex align-items-center add-btn'
            to='/products/add'
          >
            <span className='material-icons me-1'> add </span>{' '}
            <span> New Product </span>{' '}
          </Link>
        )}
        <FilterForm />
      </div>

      <section className='mt-3 border'>
        <div className='d-flex mb-2 justify-content-between bg-light py-2 px-3'>
          <h3 className='fw-normal'> Products </h3> <RowsPerPage />
        </div>
        {filteredProducts().length > 0 ? (
          <ProductsTable products={filteredProducts()} />
        ) : (
          <NoResultsMsg />
        )}
      </section>
      <Paginaton totalItems={filteredProducts().length} />
    </div>
  );
}
