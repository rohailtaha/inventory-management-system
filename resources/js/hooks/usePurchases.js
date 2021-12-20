import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { request_fetch_purchases } from '../actions/purchases/purchases-actions';

export default function usePurchases() {
  const [purchases, fetched] = useSelector(state => [
    state.purchases,
    state.purchases.fetched,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) dispatch(request_fetch_purchases());
  }, []);

  return [purchases, fetched];
}
