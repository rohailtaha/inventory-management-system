import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Fragment, useEffect } from 'react/cjs/react.development';
import { fetch_categories } from '../../actions/categories/categories-actions';
import AddCategoryForm from './add category form/AddCategoryForm';
import EditCategoryModal from './edit category modal/EditCategoryModal';
import CategoriesTable from './table/CategoriesTable';

function Categories() {
  const [fetched] = useSelector(state => [
    state.categories.fetched,
    state.successMessage,
  ]);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (!fetched) dispatch(fetch_categories());
  }, [fetched]);

  const updateMode = () => id;

  return (
    <Fragment>
      {updateMode() ? (
        <EditCategoryModal categoryID={id} />
      ) : (
        <div className='main__content main__content--categories'>
          <div className='d-xl-flex align-items-center'>
            <AddCategoryForm />
          </div>

          <section className='mt-5 table-container'>
            <div className='card'>
              <div className='card-header fs-2'>Categories</div>
              <div className='card-body'>
                <div className='table-responsive'>
                  <CategoriesTable />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </Fragment>
  );
}

export default Categories;
