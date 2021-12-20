import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_users } from '../actions/users/users-actions';

export default function useUsers() {
  const [users, fetched] = useSelector(state => [
    state.users,
    state.users.fetched,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) dispatch(fetch_users());
  }, []);

  return [users, fetched];
}
