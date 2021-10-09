import AddedPurchasesTable from '../added purchases table/AddedPurchasesTable';
import PurchaseForm from '../purchase form/PurchaseForm';

function AddPurchase() {
  return (
    <div className='main__content main__content--add-purchase'>
      <h1 className='fs-2 mb-5'>Add New Purchase</h1>
      <div>
        <PurchaseForm mode={'CREATE'} />
      </div>

      <AddedPurchasesTable />
    </div>
  );
}

export default AddPurchase;
