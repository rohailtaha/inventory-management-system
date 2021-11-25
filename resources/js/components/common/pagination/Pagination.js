import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import PagesList from './pages-list/PagesList';

export default function Paginaton({ totalItems }) {
  const [{ itemsPerPage, currentPage }] = useSelector(state => [
    state.pagination,
  ]);

  const getTotalPages = () => Math.ceil(totalItems / itemsPerPage);

  const initialItemForCurrentPage = () => (currentPage - 1) * itemsPerPage + 1;
  const lastItemForCurrentPage = () => {
    return currentPage === getTotalPages()
      ? totalItems
      : currentPage * itemsPerPage;
  };

  return (
    <Fragment>
      <div className='d-flex align-items-start mt-3 pagination'>
        {getTotalPages() > 1 && (
          <div className='pages text-end'>
            <PagesList currentPage={currentPage} totalPages={getTotalPages()} />
            <p className='pages__info'>
              Page {currentPage} of{' '}
              <span className='pages__info__total-pages'>
                {getTotalPages()}
              </span>
            </p>
          </div>
        )}
        {totalItems > 0 && (
          <p className='total-items-info ms-auto'>
            Showing {initialItemForCurrentPage()} to {lastItemForCurrentPage()}{' '}
            of {totalItems} entries
          </p>
        )}
      </div>
    </Fragment>
  );
}
