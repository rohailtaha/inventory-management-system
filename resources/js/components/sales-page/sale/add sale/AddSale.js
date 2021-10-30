import ProductsToSaleTable from '../products-to-sale-table/ProductsToSaleTable';
import SaleForm from '../sale-forms/SaleForms';

function AddSale() {
  return (
    <div className='main__content main__content--add-sale'>
      <h1 className='fs-2 mb-5'>Add New Sale</h1>
      <div>
        <SaleForm mode={'CREATE'} />
      </div>
      <ProductsToSaleTable />
    </div>
  );
}

export default AddSale;
