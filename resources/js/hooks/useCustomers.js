import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { request_fetch_customers } from '../actions/customers/customers-actions';

export default function useCustomers() {
  const [customers, fetched] = useSelector(state => [
    state.customers,
    state.customers.fetched,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) dispatch(request_fetch_customers());
  }, []);

  return [customers, fetched];
}
