import AddedSalesTable from '../added sales table/AddedSalesTable';
import SaleForm from '../sale form/SaleForm';

function EditSale() {
  return (
    <div className='main__content main__content--edit-sale'>
      <h1 className='fs-2 mb-5'>Edit Sale</h1>
      <div>
        <SaleForm mode={'UPDATE'} />
      </div>

      <AddedSalesTable />
    </div>
  );
}

export default EditSale;
