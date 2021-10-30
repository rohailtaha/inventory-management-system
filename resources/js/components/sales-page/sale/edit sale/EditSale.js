import ProductsToSaleTable from '../products-to-sale-table/ProductsToSaleTable';
import SaleForm from '../sale-forms/SaleForms';

function EditSale() {
  return (
    <div className='main__content main__content--edit-sale'>
      <h1 className='fs-2 mb-5'>Edit Sale</h1>
      <div>
        <SaleForm mode={'UPDATE'} />
      </div>

      <ProductsToSaleTable />
    </div>
  );
}

export default EditSale;
