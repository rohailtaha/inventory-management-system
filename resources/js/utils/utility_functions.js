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
