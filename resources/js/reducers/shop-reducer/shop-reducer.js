import actionTypes from '../../actions/action-types';

const initialState = {
  name: '',
  contact: '',
  address: '',
  fetched: false,
  error: {
    show: false,
    msg: '',
  },
};

export default function shopReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SHOP:
      return {
        ...state,
        ...action.payload,
        fetched: true,
      };

    case actionTypes.UPDATE_SHOP:
      return {
        ...state,
        ...action.payload,
      };

    case actionTypes.SHOW_SHOP_ERROR:
      return {
        ...state,
        error: {
          show: true,
          msg: action.payload.msg,
        },
      };
    case actionTypes.HIDE_SHOP_ERROR:
      return {
        ...state,
        error: initialState.error,
      };

    default:
      return state;
  }
}
