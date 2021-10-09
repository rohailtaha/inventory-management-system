function FilterForm() {
  const handleChange = event => {};

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
            <option value='All'>All</option>
            <option value='1'>Kitchenware</option>
            <option value='2'>Bakery</option>
            <option value='3'>Home Appliances</option>
            <option value='3'>Clothing</option>
            <option value='3'>Movies & Games</option>
            <option value='3'>Shoes</option>
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
            name='search'
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
}

export default FilterForm;
