import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";

function SupplierForm({mode}) {
  const [form, setForm] = useState({
    name: '',
    contact: '',
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
          className='form-control'
          id='name'
          name='name'
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='contact' className='form-label fw-bold'>
          Contact
        </label>
        <input
          type='tel'
          className='form-control'
          id='contact'
          name='contact'
          value={form.contact}
          onChange={handleChange}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='address' className='form-label fw-bold'>
          Address
        </label>
        <input
          type='text'
          className='form-control'
          id='address'
          name='address'
          value={form.address}
          onChange={handleChange}
        />
      </div>

      <div className='d-sm-flex'>
        <button
          type='submit'
          className='btn btn-primary flex-grow-1 mb-2 mb-sm-0'
          onSubmit={handleSubmit}
        >
          {mode === 'CREATE' ? 'Add ' : 'Update '} Supplier
        </button>
        <Link to='/suppliers' className='btn btn-danger flex-grow-1 ms-sm-3'>
          Cancel
        </Link>
      </div>
    </form>
  );
}

export default SupplierForm;
