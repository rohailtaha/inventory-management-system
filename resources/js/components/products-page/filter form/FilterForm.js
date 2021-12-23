import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set_search_form } from '../../../actions/products/products-actions';
import ProductCategoryOption from '../../common/product-category-option/ProductCategoryOption';

function FilterForm() {
  const [categories] = useSelector(state => [state.categories.list]);
  const dispatch = useDispatch();

  const defaultState = () => ({
    product: '',
    category: 'All',
  });

  const handleChange = event => {
    dispatch(
      set_search_form({
        [event.target.name]: event.target.value,
      })
    );
  };

  useEffect(() => {
    dispatch(set_search_form(defaultState()));
  }, []);

  return (
    <form action='' className='mt-5 mt-xl-0'>
      <div className='row'>
        <div className='col-6 d-flex align-items-center'>
          <label htmlFor='category' className='form-label mb-0 me-2'>
            Category
          </label>
          <select
            className='form-select form-select-sm'
            id='category'
            name='category'
            onChange={handleChange}
          >
            <option value='All'> All </option>;
            {categories.map(category => (
              <ProductCategoryOption name={category.name} key={category.id} />
            ))}
          </select>
        </div>

        <div className='col-6 d-flex align-items-center'>
          <label htmlFor='search' className='form-label mb-0 me-2'>
            Search
          </label>
          <input
            placeholder='Product name / Barcode'
            type='search'
            className='form-control form-control-sm'
            id='search'
            name='product'
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
}

export default FilterForm;
