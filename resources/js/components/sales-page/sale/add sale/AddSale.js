import AddedSalesTable from '../added sales table/AddedSalesTable';
import SaleForm from '../sale form/SaleForm';

function AddSale() {
  return (
    <div className='main__content main__content--add-sale'>
      <h1 className='fs-2 mb-5'>Add New Sale</h1>
      <div>
        <SaleForm mode={'CREATE'} />
      </div>
      <AddedSalesTable />
    </div>
  );
}

export default AddSale;
