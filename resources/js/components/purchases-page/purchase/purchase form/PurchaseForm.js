import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  clear_products_from_purchase,
  hide_error,
} from '../../../../actions/purchases/purchases-actions';
import { hide_success_message } from '../../../../actions/success-message/success-message-actions';
import ProductToPurchaseForm from './product-to-purchase-form/ProductToPurchaseForm';
import PurchaseDetailsForm from './purchase-details-form/PurchaseDetailsForm';

function PurchaseForm({ mode }) {
  const [grandTotal] = useSelector(state => [
    state.purchases.productsToPurchase.reduce(
      (previous, current) => previous + parseFloat(current.total_cost),
      0
    ),
  ]);

  const dispatch = useDispatch();

  useEffect(() => cleanup, []);

  const cleanup = () => {
    dispatch(clear_products_from_purchase());
    dispatch(hide_error());
    dispatch(hide_success_message());
  };

  return (
    <Fragment>
      <Fragment>
        <ProductToPurchaseForm />
        <PurchaseDetailsForm mode={mode} grandTotal={grandTotal} />
      </Fragment>
    </Fragment>
  );
}

export default PurchaseForm;
