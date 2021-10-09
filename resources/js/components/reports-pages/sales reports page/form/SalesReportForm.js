function SalesReportForm() {

  return (
    <form className=''>
      <div className='d-lg-flex align-items-end'>
        <div className='flex-grow-1'>
          <label className='form-label fw-bold'>Date Range</label>
          <div className='input-group'>
            <input
              type='date'
              className='form-control'
              placeholder='Start date'
            />
            <span className='input-group-text'>to</span>
            <input
              type='date'
              className='form-control'
              placeholder='End Date'
            />
          </div>
        </div>
        <button
          className='btn btn-primary mt-2 mt-lg-0 ms-lg-3 px-2 py-1'
        >
          <i className='fas fa-plus me-1'></i> Generate
        </button>
      </div>
    </form>
  );
}

export default SalesReportForm;
