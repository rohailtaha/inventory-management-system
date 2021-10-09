function EditCategoryModal() {
  return (
    <div className='modal' tabIndex='-1'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Edit Category</h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <input className='form-control' value={'Movies & Games'} />
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-primary'>
              Save changes
            </button>
            <button
              type='button'
              className='btn btn-danger'
              data-bs-dismiss='modal'
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCategoryModal;
