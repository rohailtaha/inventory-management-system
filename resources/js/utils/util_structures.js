import { hide_delete_confirmation } from '../actions/delete-confirmation/delete-confirmation-actions';
import { reset_pagination } from '../actions/pagination/pagination-actions';
import { hide_success_message } from '../actions/success-message/success-message-actions';

export const APP_NAME = 'StockPort';

export const userRoles = {
  ADMIN: 'Admin',
  EMPLOYEE: 'Employee',
};

export const userStatus = {
  ACTIVE: 'Active',
  BLOCKED: 'Blocked',
};

export const purchaseStatus = [
  { id: 1, value: 'Received' },
  { id: 2, value: 'Pending' },
];

export const paymentStatus = [
  { id: 1, value: 'Paid' },
  { id: 2, value: 'Unpaid' },
  { id: 3, value: 'Partial' },
];

export const dateRangeTypes = {
  ALL_TIME: 'All Time',
  CUSTOM: 'Custom',
};

export const orders = {
  ASC: 'ASC',
  DESC: 'DESC',
};

export const rowsPerPage = [10, 25, 50, 100];
export const defaultRowsCountPerPage = rowsPerPage[1];

// 3000 ms => 3s
export const ERROR_DURATION = 3000;

export const SERVER_ERROR = 'Server Error';

export const defaultCleanupFunctions = [
  hide_success_message,
  hide_delete_confirmation,
  reset_pagination,
];
