import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clear_products_from_sale,
  hide_error,
} from '../../../../actions/sales/sales-actions';
import { hide_success_message } from '../../../../actions/success-message/success-message-actions';
import withCleaner from '../../../hocs/withCleaner';
import ProductToSaleForm from './products-to-sale-form/ProductToSaleForm';
import SaleDetailsForm from './sale-details-form/SaleDetailsForm';

function SaleForm({ mode }) {
  const [grandTotal] = useSelector(state => [
    state.sales.productsToSale.reduce(
      (previous, current) => previous + parseFloat(current.total_price),
      0
    ),
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
    </Fragment>
  );
}

export default withCleaner(SaleForm, [
  clear_products_from_sale,
  hide_error,
  hide_success_message,
]);
