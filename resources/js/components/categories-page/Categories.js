import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Fragment, useEffect } from 'react/cjs/react.development';
import {
  fetch_categories,
  request_delete_category,
} from '../../actions/categories/categories-actions';
import { hide_delete_confirmation } from '../../actions/delete-confirmation/delete-confirmation-actions';
import { reset_pagination } from '../../actions/pagination/pagination-actions';
import { hide_success_message } from '../../actions/success-message/success-message-actions';
import Paginaton from '../common/pagination/Pagination';
import AddCategoryForm from './add category form/AddCategoryForm';
import EditCategoryModal from './edit category modal/EditCategoryModal';
import CategoriesTable from './table/CategoriesTable';

function Categories() {
  const [fetched, deleteConfirmation, categories] = useSelector(state => [
    state.categories.fetched,
    state.deleteConfirmation,
    state.categories.list,
  ]);

  const dispatch = useDispatch();
  const { id } = useParams();
  const updateMode = () => id;

  useEffect(() => {
    if (!fetched) dispatch(fetch_categories());
  }, [fetched]);

  useEffect(() => {
    if (deleteConfirmation.confirm)
      dispatch(request_delete_category(deleteConfirmation.deleteID));
  }, [deleteConfirmation.confirm]);

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(hide_success_message());
    dispatch(hide_delete_confirmation());
    dispatch(reset_pagination());
  };

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
            {fetched && <Paginaton totalItems={categories.length} />}
          </section>
        </div>
      )}
    </Fragment>
  );
}

export default Categories;
