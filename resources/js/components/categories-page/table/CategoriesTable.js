import { useSelector } from 'react-redux';
import Category from './Category';

function CategoriesTable() {
  const [categories, pagination] = useSelector(state => [
    state.categories.list,
    state.pagination,
  ]);

  const itemsForCurrentPage = () =>
    categories.slice(
      initialItemIndexForCurrentPage(),
      initialItemIndexForCurrentPage() + pagination.itemsPerPage
    );

  const initialItemIndexForCurrentPage = () =>
    (pagination.currentPage - 1) * pagination.itemsPerPage;

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {itemsForCurrentPage().map(category => (
          <Category key={category.id} id={category.id} name={category.name} />
        ))}
      </tbody>
    </table>
  );
}

export default CategoriesTable;
