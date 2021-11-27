import { orders } from './util_structures';

export const getProfitMargin = (purchasePrice, salePrice) =>
  ((salePrice - purchasePrice) * 100) / purchasePrice;

export const getSalePrice = (purchasePrice, profitMargin) =>
  purchasePrice + (profitMargin / 100) * purchasePrice;

export const discount = (amount, discountPercent) =>
  float((discountPercent / 100) * amount);

// Converts a "numeric string"|number to a float of max "length" digits in the fractional part.
export const float = (number, length = 2) =>
  parseFloat(parseFloat(number).toFixed(length));

// Converts a "numeric string"|number to a numeric string of max "length" digits in the fractional part.
export const numericString = (number, length = 2) =>
  parseFloat(number).toFixed(length);

export const isEmpty = string => removeExtraSpaces(string) === '';

export const areEmpty = (values = []) => values.every(value => isEmpty(value));

export const removeExtraSpaces = string =>
  string
    .split(' ')
    .filter(s => s)
    .join(' ');

export const stringStarts = (parentString, childString) =>
  removeExtraSpaces(parentString)
    .toLowerCase()
    .startsWith(removeExtraSpaces(childString).toLowerCase());

export const stringIncludes = (parentString, childString) =>
  removeExtraSpaces(parentString)
    .toLowerCase()
    .includes(removeExtraSpaces(childString).toLowerCase());

export const toggleClass = (element, oldClass, newClass) => {
  element.classList.remove(oldClass);
  element.classList.add(newClass);
};

export const sort = (data, key, order, limit = null) => {
  limit = limit ? limit : data.length;
  if (order == orders.ASC) {
    return data.slice(0, limit).sort(sortAsc);
  }

  if (order === orders.DESC) {
    return data.slice(0, limit).sort(sortDesc);
  }

  function sortAsc(firstRecord, secondRecord) {
    return typeof firstRecord[key] === 'string'
      ? firstRecord[key].toLowerCase() <= secondRecord[key].toLowerCase()
        ? -1
        : 1
      : firstRecord[key] <= secondRecord[key]
      ? -1
      : 1;
  }

  function sortDesc(firstRecord, secondRecord) {
    return typeof firstRecord[key] === 'string'
      ? firstRecord[key].toLowerCase() >= secondRecord[key].toLowerCase()
        ? -1
        : 1
      : firstRecord[key] >= secondRecord[key]
      ? -1
      : 1;
  }
};

export const getDate = string => {
  const date = new Date(string);
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
};
