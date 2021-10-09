import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';

function CustomerForm({ mode }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(form => ({
      ...form,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
  };
  return (
    <form className='mt-4'>
      <div className='mb-3'>
        <label htmlFor='name' className='form-label fw-bold'>
          Name
        </label>
        <input
          type='text'
          className='form-control form-control-sm'
          id='name'
          onChange={handleChange}
          name='name'
          value={form.name}
          required
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='email' className='form-label fw-bold'>
          Email
        </label>
        <input
          type='email'
          className='form-control form-control-sm'
          id='email'
          name='email'
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='phone' className='form-label fw-bold'>
          Phone
        </label>
        <input
          type='tel'
          className='form-control form-control-sm'
          id='phone'
          onChange={handleChange}
          name='phone'
          value={form.phone}
          required
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='address' className='form-label fw-bold'>
          Address
        </label>
        <input
          type='text'
          className='form-control form-control-sm'
          id='address'
          name='address'
          value={form.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className='d-sm-flex'>
        <button
          type='submit'
          className='btn btn-primary flex-grow-1 mb-2 mb-sm-0'
          onSubmit={handleSubmit}
        >
          {mode === 'CREATE' ? 'Add' : 'Update'} Customer
        </button>
        <Link to='/customers' className='btn btn-danger flex-grow-1 ms-sm-3'>
          Cancel
        </Link>
      </div>
    </form>
  );
}

export default CustomerForm;
