import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_categories } from '../actions/categories/categories-actions';

export default function useCategories() {
  const [categories, fetched] = useSelector(state => [
    state.categories,
    state.categories.fetched,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) dispatch(fetch_categories());
  }, []);

  return [categories, fetched];
}
