import actionTypes from '../../actions/action-types';

const initialState = {
  list: [],
  fetched: false,
};

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_USERS:
      return {
        ...state,
        list: action.payload,
      };

    case actionTypes.SET_ARE_USERS_FETCHED:
      return {
        ...state,
        fetched: action.payload,
      };
    case actionTypes.ADD_USER:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        list: state.list.map(user => {
          return user.id === action.payload.id ? action.payload : user;
        }),
      };

    case actionTypes.DELETE_USER:
      return {
        ...state,
        list: state.list.filter(user => user.id != action.payload),
      };
    default:
      return state;
  }
}

export default usersReducer;
