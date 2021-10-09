function Spinner() {
  return (
    <div className='d-flex justify-content-center align-items-center spinner-container'>
      <div className='spinner-border text-white' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
