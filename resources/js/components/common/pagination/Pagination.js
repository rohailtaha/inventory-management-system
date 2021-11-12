import { useSelector } from 'react-redux';
import PagesList from './pages-list/PagesList';

export default function Paginaton({ totalItems }) {
  const [pagination] = useSelector(state => [state.pagination]);

  const getTotalPages = () => Math.ceil(totalItems / pagination.itemsPerPage);

  return (
    <div className='pages text-center mt-4'>
      <PagesList
        currentPage={pagination.currentPage}
        totalPages={getTotalPages()}
      />
      <p className='pages__info'>
        Page <b> {pagination.currentPage} </b> of{' '}
        <span className='pages__info__total-pages'>{getTotalPages()}</span>
      </p>
    </div>
  );
}
