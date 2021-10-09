export function getProfitMargin(purchasePrice, salePrice) {
  return ((salePrice - purchasePrice) * 100) / purchasePrice;
}

export function getSalePrice(purchasePrice, profitMargin) {
  return purchasePrice + (profitMargin / 100) * purchasePrice;
}

export function getDiscount(amount, discountPercent) {
  return (discountPercent / 100) * amount;
}

export function isEmpty(string) {
  return removeExtraSpaces(string) === '';
}

export function removeExtraSpaces(string) {
  return string
    .split(' ')
    .filter(s => s)
    .join(' ');
}
