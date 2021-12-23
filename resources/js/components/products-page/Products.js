import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { request_delete_product } from '../../actions/products/products-actions';
import { stringStarts } from '../../utils/utility_functions';
import {
  defaultCleanupFunctions,
  userRoles,
} from '../../utils/util_structures';
import NoResultsMsg from '../common/no-results-msg/NoResultsMsg';
import Paginaton from '../common/pagination/Pagination';
import RowsPerPage from '../common/rows-per-page/RowsPerPage';
import withCleaner from '../hocs/withCleaner';
import FilterForm from './filter form/FilterForm';
import ProductsTable from './table/ProductsTable';

function Products() {
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
        <div className='d-flex justify-content-between bg-light py-2 px-3 border-bottom'>
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

export default withCleaner(Products, defaultCleanupFunctions);
