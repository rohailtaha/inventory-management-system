<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class CorrectTotalCostForProducts implements Rule {

  public function passes($attribute, $products) {
    foreach ($products as $product) {
      if ($product['per_item_cost'] * $product['quantity'] != $product['total_cost']) {
        return false;
      }
    }
    return true;
  }

  public function message() {
    return 'Total Cost of product must be a multiple of Quantity and Per Item Cost.';
  }
}
