import AddedPurchasesTable from '../added purchases table/AddedPurchasesTable';
import PurchaseForm from '../purchase form/PurchaseForm';

function EditPurchase() {
  return (
    <div className='main__content main__content--edit-purchase'>
      <h1 className='fs-2 mb-5'>Edit Purchase</h1>
      <div>
        <PurchaseForm mode={'UPDATE'} />
      </div>
      <AddedPurchasesTable />
    </div>
  );
}

export default EditPurchase;
