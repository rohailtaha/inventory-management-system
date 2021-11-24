import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import {
  hide_error,
  request_update_category,
} from '../../../actions/categories/categories-actions';
import { removeExtraSpaces } from '../../../utils/utility_functions';
import FormError from '../../common/form-error/FormError';
import { hide_success_message } from '../../../actions/success-message/success-message-actions';

function EditCategoryModal({ categoryID }) {
  const [categories, successMessage, error] = useSelector(state => [
    state.categories.list,
    state.successMessage,
    state.categories.error,
  ]);

  const getCategory = id =>
    categories.find(category => category.id === parseInt(id));

  const [form, setForm] = useState({ name: getCategory(categoryID).name });
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectToCategories = () => history.push('/categories');
    if (successMessage.show) redirectToCategories();
  }, [successMessage.show]);

  const handleChange = event =>
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(request_update_category(dataWithCorrectFormat(), categoryID));
  };

  const dataWithCorrectFormat = () => ({
    name: removeExtraSpaces(form.name),
  });

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(hide_error());
    dispatch(hide_success_message());
  };

  return (
    <div className='modal edit-category-modal d-block' tabIndex='-1'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Edit Category</h5>
            <Link to='/categories' type='button' className='btn-close'></Link>
          </div>
          <div className='modal-body'>
            <input
              className='form-control mb-2'
              name='name'
              value={form.name}
              onChange={handleChange}
            />
            {error.show && <FormError msg={error.msg} />}
          </div>
          <div className='modal-footer'>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={handleSubmit}
            >
              Update
            </button>
            <Link to='/categories' type='button' className='btn btn-danger'>
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCategoryModal;
