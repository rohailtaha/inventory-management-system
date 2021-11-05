import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clear_products_from_sale,
  hide_error,
} from '../../../../actions/sales/sales-actions';
import { hide_success_message } from '../../../../actions/success-message.js/success-message-actions';
import SuccessModal from '../../../common/success-modal/SuccessModal';
import PaymentMismatchModal from './messages/PaymentMismatchModal';
import ProductToSaleForm from './products-to-sale-form/ProductToSaleForm';
import SaleDetailsForm from './sale-details-form/SaleDetailsForm';

function SaleForm({ mode }) {
  const [grandTotal, successMessage] = useSelector(state => [
    state.sales.productsToSale.reduce(
      (previous, current) => previous + current.total_price,
      0
    ),
    state.successMessage,
  ]);

  const dispatch = useDispatch();

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(clear_products_from_sale());
    dispatch(hide_error());
    dispatch(hide_success_message());
  };

  return (
    <Fragment>
      <ProductToSaleForm />
      <hr />
      <SaleDetailsForm mode={mode} grandTotal={grandTotal} />
      <hr />
      {successMessage.show && <SuccessModal msg={successMessage.text} />}
      <PaymentMismatchModal grandTotal={grandTotal} netPayment={1100} />
    </Fragment>
  );
}

export default SaleForm;
