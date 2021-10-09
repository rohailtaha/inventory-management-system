import { useSelector } from 'react-redux';
import Category from './Category';

function CategoriesTable() {

  const categories = useSelector(state => state.categories.list);

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map(category => (
          <Category key={category.id} id={category.id} name={category.name} />
        ))}
      </tbody>
    </table>
  );
}


export default CategoriesTable;
