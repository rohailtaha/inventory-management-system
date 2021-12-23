import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { request_fetch_suppliers } from '../actions/suppliers/suppliers-actions';

export default function useSuppliers() {
  const [suppliers, fetched] = useSelector(state => [
    state.suppliers,
    state.suppliers.fetched,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) dispatch(request_fetch_suppliers());
  }, []);

  return [suppliers, fetched];
}
