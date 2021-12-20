import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { request_fetch_sales } from '../actions/sales/sales-actions';

export default function useSales() {
  const [sales, fetched] = useSelector(state => [
    state.sales,
    state.sales.fetched,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) dispatch(request_fetch_sales());
  }, []);

  return [sales, fetched];
}
