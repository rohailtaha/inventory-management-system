import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment } from 'react/cjs/react.development';
import { create_category } from '../../../actions/categories/categories-actions';
import FormError from '../../common/form-error/FormError';
import Spinner from '../../common/spinner/Spinner';
import SuccessModal from '../../common/success-modal/SuccessModal';

function AddCategoryForm() {
  const [form, setForm] = useState({ name: '' });
  const dispatch = useDispatch();

  const [error, loading, successMessage] = useSelector(state => [
    state.categories.error,
    state.loading,
    state.successMessage,
  ]);

  const handleChange = event => {
    setForm({
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(create_category(form));
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div className='mb-2 d-md-flex align-items-center'>
          <input
            type='text'
            className='form-control w-auto'
            placeholder='Add new category'
            name='name'
            value={form.name}
            onChange={handleChange}
            required
          />
          <button
            className='btn btn-primary ms-3 px-2 py-1 d-flex align-items-center'
            type='submit'
          >
            <span className='material-icons me-1'> add </span> Add
          </button>
        </div>
        {error.show && <FormError msg={error.msg} />}
      </form>
      {loading && <Spinner />}
      {successMessage.show && <SuccessModal msg={successMessage.text} />}
    </Fragment>
  );
}

export default AddCategoryForm;
