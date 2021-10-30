import actionTypes from '../../actions/action-types';

const initialState = {
  list: [],
  productsToPurchase: [],
  productsToPurchaseFormError: {
    show: false,
    msg: '',
  },
  fetched: false,
  error: {
    show: false,
    msg: '',
  },
};

function purchasesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_PURCHASES:
      return {
        ...state,
        fetched: true,
        list: action.payload,
      };

    case actionTypes.CREATE_PURCHASE:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };

    case actionTypes.UPDATE_PURCHASE:
      return {
        ...state,
        list: state.list.map(purchase =>
          purchase.id === action.payload.id ? action.payload : purchase
        ),
      };

    case actionTypes.DELETE_PURCHASE:
      return {
        ...state,
        list: state.list.filter(purchase => purchase.id != action.payload.id),
      };

    case actionTypes.SET_PRODUCTS_TO_PURCHASE:
      return {
        ...state,
        productsToPurchase: action.payload,
      };

    case actionTypes.ADD_PRODUCT_TO_PURCHASE:
      return {
        ...state,
        productsToPurchase: [action.payload, ...state.productsToPurchase],
      };

    case actionTypes.DELETE_PRODUCT_FROM_PURCHASE:
      return {
        ...state,
        productsToPurchase: state.productsToPurchase.filter(
          product => product.id != action.payload.id
        ),
      };

    case actionTypes.CLEAR_PRODUCTS_FROM_PURCHASE:
      return {
        ...state,
        productsToPurchase: [],
      };

    case actionTypes.SHOW_PRODUCTS_TO_PURCHASE_FORM_ERROR:
      return {
        ...state,
        productsToPurchaseFormError: {
          show: true,
          msg: action.payload.message,
        },
      };

    case actionTypes.HIDE_PRODUCTS_TO_PURCHASE_FORM_ERROR:
      return {
        ...state,
        productsToPurchaseFormError: {
          show: false,
          msg: '',
        },
      };

    case actionTypes.SHOW_PURCHASE_ERROR:
      return {
        ...state,
        error: {
          show: true,
          msg: action.payload.message,
        },
      };

    case actionTypes.HIDE_PURCHASE_ERROR:
      return {
        ...state,
        error: {
          show: false,
          msg: '',
        },
      };

    default:
      return state;
  }
}

export default purchasesReducer;
