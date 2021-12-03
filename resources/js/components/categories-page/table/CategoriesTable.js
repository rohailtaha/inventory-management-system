import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resort_categories,
  sort_categories,
} from '../../../actions/categories/categories-actions';
import SortArrows from '../../common/sort-arrows/SortArrows';
import Category from './Category';

function CategoriesTable() {
  const [categories, pagination] = useSelector(state => [
    state.categories.list,
    state.pagination,
  ]);

  const dispatch = useDispatch();

  const itemsForCurrentPage = () =>
    categories.slice(
      initialItemIndexForCurrentPage(),
      initialItemIndexForCurrentPage() + pagination.itemsPerPage
    );

  const initialItemIndexForCurrentPage = () =>
    (pagination.currentPage - 1) * pagination.itemsPerPage;

  const sort = (key, order) => dispatch(sort_categories(key, order));

  useEffect(() => cleanup, []);

  const cleanup = () => dispatch(resort_categories());

  return (
    <div className='table-responsive'>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>
              Name
              <SortArrows aKey='name' sort={sort} />
            </th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemsForCurrentPage().map(category => (
            <Category key={category.id} id={category.id} name={category.name} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoriesTable;
