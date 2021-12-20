import { useDispatch, useSelector } from 'react-redux';
import {
  resort_categories,
  sort_categories,
} from '../../../actions/categories/categories-actions';
import useItemsForCurrentPage from '../../../hooks/useItemsForCurrentPage';
import SortArrows from '../../common/sort-arrows/SortArrows';
import withCleaner from '../../hocs/withCleaner';
import Category from './Category';

function CategoriesTable() {
  const [categories] = useSelector(state => [state.categories.list]);

  const dispatch = useDispatch();

  const itemsForCurrentPage = useItemsForCurrentPage(categories);

  const sort = (key, order) => dispatch(sort_categories(key, order));

  return (
    <div className='table-responsive'>
      <table className='table'>
        <thead className='table-light'>
          <tr>
            <th scope='col'>
              Name
              <SortArrows aKey='name' sort={sort} />
            </th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemsForCurrentPage.map(category => (
            <Category key={category.id} id={category.id} name={category.name} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default withCleaner(CategoriesTable, [resort_categories]);
