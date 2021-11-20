<?php

namespace App\Rules;

use App\Models\Product;
use Illuminate\Contracts\Validation\Rule;

class CorrectSaleQuantityForProduct implements Rule {

  public function passes($attribute, $products) {
    foreach ($products as $product) {
      if (Product::findOrFail($product['id'])->quantity < $product['quantity']) {
        return false;
      }
    }
    return true;
  }

  public function message() {
    return 'One of the selected product is low in stock.';
  }
}
