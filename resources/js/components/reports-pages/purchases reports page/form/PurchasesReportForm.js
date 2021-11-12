import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { set_purchases_report } from '../../../../actions/purchases/purchases-actions';
import { dateRangeTypes } from '../../../../utils/util_structures';

function PurchasesReportForm() {
  const [form, setForm] = useState({
    dateRangeType: dateRangeTypes.ALL_TIME,
    startDate: '',
    endDate: '',
  });

  const dispatch = useDispatch();

  const handleChange = event =>
    setForm(form => ({
      ...form,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(set_purchases_report(form));
  };

  return (
    <form
      className='report-form report-form--purchases'
      onSubmit={handleSubmit}
    >
      <div className='mb-3'>
        <label htmlFor='range' className='form-label fw-bold'>
          Range Type
        </label>
        <select
          className='form-select form-select-sm'
          id='range'
          onChange={handleChange}
          name='dateRangeType'
          value={form.dateRangeType}
          required
        >
          <option value={dateRangeTypes.ALL_TIME}>
            {dateRangeTypes.ALL_TIME}
          </option>
          <option value={dateRangeTypes.CUSTOM}>{dateRangeTypes.CUSTOM}</option>
        </select>
      </div>

      {form.dateRangeType === dateRangeTypes.CUSTOM && (
        <div className='d-lg-flex align-items-end mb-3'>
          <div className='flex-grow-1'>
            <label className='form-label fw-bold'>Custom Date Range</label>
            <div className='input-group'>
              <input
                type='date'
                className='form-control'
                placeholder='Start date'
                name='startDate'
                onChange={handleChange}
                value={form.startDate}
                required
              />
              <span className='input-group-text'>to</span>
              <input
                type='date'
                className='form-control'
                placeholder='End Date'
                name='endDate'
                onChange={handleChange}
                value={form.endDate}
                required
              />
            </div>
          </div>
        </div>
      )}
      <button className='btn btn-primary px-3 py-1' type='submit'>
        Generate
      </button>
    </form>
  );
}

export default PurchasesReportForm;
