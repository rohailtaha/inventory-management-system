import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_products } from '../actions/products/products-actions';

export default function useProducts() {
  const [products, fetched] = useSelector(state => [
    state.products,
    state.products.fetched,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) dispatch(fetch_products());
  }, []);

  return [products, fetched];
}
