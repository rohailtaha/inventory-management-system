import actionTypes from '../action-types';

export const set_current_page = pageNumber => ({
  type: actionTypes.SET_CURRENT_PAGE,
  payload: pageNumber,
});

export const set_items_per_page = itemsPerPage => ({
  type: actionTypes.SET_ITEMS_PER_PAGE,
  payload: itemsPerPage,
});

export const reset_pagination = () => ({
  type: actionTypes.RESET_PAGINATION,
});
