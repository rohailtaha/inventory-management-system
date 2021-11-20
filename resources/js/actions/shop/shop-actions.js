import { SERVER_ERROR } from '../../utils/util_structures';
import actionTypes from '../action-types';
import { load, stopLoading } from '../load/load';
import { show_success_message } from '../success-message/success-message-actions';

const SUCCESSFULL_UPDATE_MSG = 'Shop updated.';

export const request_fetch_shop = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/shop');
      if (response.data.status === 'OK') {
        dispatch(set_shop(response.data.shop));
      } else {
        dispatch(show_error(response.data.error.msg));
      }
    } catch (error) {
      dispatch(show_error(SERVER_ERROR));
    }
  };
};

export const set_shop = shop => ({
  type: actionTypes.SET_SHOP,
  payload: shop,
});

export const request_update_shop = shop => {
  return async dispatch => {
    dispatch(load());
    try {
      const response = await axios.put('/api/shop', shop);
      if (response.data.status === 'OK') {
        dispatch(hide_error());
        dispatch(show_success_message(SUCCESSFULL_UPDATE_MSG));
        dispatch(update_shop(response.data.shop));
      } else {
        dispatch(show_error(response.data.error.msg));
      }
    } catch (error) {
      error.response.data.error
        ? dispatch(show_error(error.response.data.error.msg))
        : dispatch(show_error(SERVER_ERROR));
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const update_shop = shop => ({
  type: actionTypes.UPDATE_SHOP,
  payload: shop,
});

export const show_error = msg => ({
  type: actionTypes.SHOW_SHOP_ERROR,
  payload: {
    msg,
  },
});

export const hide_error = () => ({
  type: actionTypes.HIDE_SHOP_ERROR,
});
