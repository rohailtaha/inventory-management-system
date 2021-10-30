import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  clear_products_from_purchase,
  hide_error,
} from '../../../../actions/purchases/purchases-actions';
import { hide_success_message } from '../../../../actions/success-message.js/success-message-actions';
import ProductToPurchaseForm from './product-to-purchase-form/ProductToPurchaseForm';
import PurchaseDetailsForm from './purchase-details-form/PurchaseDetailsForm';
import SuccessModal from '../../../common/success-modal/SuccessModal';

function PurchaseForm({ mode }) {
  const [grandTotal, successMessage] = useSelector(state => [
    state.purchases.productsToPurchase.reduce(
      (previous, current) => previous + current.total_cost,
      0
    ),
    state.successMessage,
  ]);

  const dispatch = useDispatch();

  const updateMode = () => mode === 'UPDATE';

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(clear_products_from_purchase());
    dispatch(hide_error());
    dispatch(hide_success_message());
  };

  return (
    <Fragment>
      <ProductToPurchaseForm />
      <PurchaseDetailsForm mode={mode} grandTotal={grandTotal} />
      {successMessage.show && <SuccessModal msg={successMessage.text} />}
    </Fragment>
  );
}

export default PurchaseForm;
