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
import FilterForm from './filter form/FilterForm';
import ProductsTable from './table/ProductsTable';

export default function Products() {
  const [
    fetched,
    fetchedCategories,
    deleteConfirmation,
    products,
    searchForm,
    userRole,
  ] = useSelector(state => [
    state.products.fetched,
    state.categories.fetched,
    state.deleteConfirmation,
    state.products.list,
    state.products.searchForm,
    state.users.user.role,
  ]);

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
    if (!fetchedCategories) dispatch(fetch_categories());
    if (!fetched) dispatch(fetch_products());
  }, []);

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

      <section className='mt-3'>
        <div className='card'>
          <div className='card-header fs-2'>Products</div>
          <div className='card-body'>
            <div className='table-responsive'>
              {filteredProducts().length > 0 ? (
                <ProductsTable products={filteredProducts()} />
              ) : (
                <NoResultsMsg />
              )}
            </div>
          </div>
        </div>
        {fetched && <Paginaton totalItems={filteredProducts().length} />}
      </section>
    </div>
  );
}
