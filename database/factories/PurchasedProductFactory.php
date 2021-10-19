<?php

namespace Database\Factories;

use App\Models\PurchasedProduct;
use Illuminate\Database\Eloquent\Factories\Factory;

class PurchasedProductFactory extends Factory {

  protected $model = PurchasedProduct::class;

  public function definition() {
    return [
      'purchase_id' => $this->faker->numberBetween(1, 5),
      'product_id' => $this->faker->numberBetween(1, 40),
      'quantity' => 5,
      'per_item_cost' => 50.00,
      'total_cost' => 250.00,
    ];
  }
}
