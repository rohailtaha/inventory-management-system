import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import PagesList from './pages-list/PagesList';

export default function Paginaton({ totalItems }) {
  const [pagination] = useSelector(state => [state.pagination]);

  const getTotalPages = () => Math.ceil(totalItems / pagination.itemsPerPage);

  return (
    <Fragment>
      {getTotalPages() > 1 && (
        <div className='pages text-center mt-5'>
          <PagesList
            currentPage={pagination.currentPage}
            totalPages={getTotalPages()}
          />
          <p className='pages__info'>
            Page <b> {pagination.currentPage} </b> of{' '}
            <span className='pages__info__total-pages'>{getTotalPages()}</span>
          </p>
        </div>
      )}
    </Fragment>
  );
}
