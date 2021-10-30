import { Fragment, useState } from 'react';
import PaymentMismatchModal from './messages/PaymentMismatchModal';
import ProductToSaleForm from './products-to-sale-form/ProductToSaleForm';
import SaleDetailsForm from './sale-details-form/SaleDetailsForm';

function SaleForm({ mode }) {
  return (
    <Fragment>
      <ProductToSaleForm />
      <hr />
      <SaleDetailsForm mode={mode} />
      <hr />
      <PaymentMismatchModal grandTotal={1200} netPayment={1100} />
    </Fragment>
  );
}

export default SaleForm;
