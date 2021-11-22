import { orders } from './util_structures';

export function getProfitMargin(purchasePrice, salePrice) {
  return ((salePrice - purchasePrice) * 100) / purchasePrice;
}

export function getSalePrice(purchasePrice, profitMargin) {
  return purchasePrice + (profitMargin / 100) * purchasePrice;
}

export function discount(amount, discountPercent) {
  return parseFloat(((discountPercent / 100) * amount).toFixed(2));
}

export function isEmpty(string) {
  return removeExtraSpaces(string) === '';
}

export function areEmpty(values = []) {
  return values.every(value => isEmpty(value));
}

export function removeExtraSpaces(string) {
  return string
    .split(' ')
    .filter(s => s)
    .join(' ');
}

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
