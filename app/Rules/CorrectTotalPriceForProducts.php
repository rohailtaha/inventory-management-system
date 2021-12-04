<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class CorrectTotalPriceForProducts implements Rule {

  public function passes($attribute, $products) {
    foreach ($products as $product) {
      if ($product['final_sale_price'] * $product['quantity'] !== floatVal($product['total_price'])) {
        return false;
      }
    }
    return true;
  }

  public function message() {
    return 'Total Price of product must be a multiple of Quantity and Final Price.';
  }
}
