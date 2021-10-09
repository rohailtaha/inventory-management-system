import actionTypes from '../action-types';

function setUsers(users) {
  return {
    type: actionTypes.SET_USERS,
    payload: users,
  };
}

function setAreUsersFetched(fetched) {
  return {
    type: actionTypes.SET_ARE_USERS_FETCHED,
    payload: fetched,
  };
}

function add_user(user) {
  return {
    type: actionTypes.ADD_USER,
    payload: user,
  };
}

function update_user(user) {
  return {
    type: actionTypes.UPDATE_USER,
    payload: user,
  };
}

function delete_user(id) {
  return dispatch => {
    axios
      .delete(`/api/users/${id}`)
      .then(() =>
        dispatch({
          type: actionTypes.DELETE_USER,
          payload: id,
        })
      )
      .catch(error => console.log(error));
  };
}

export { setUsers, setAreUsersFetched, add_user, update_user, delete_user };
