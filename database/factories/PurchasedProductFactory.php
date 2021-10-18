<?php

namespace Database\Factories;

use App\Models\PurchasedProduct;
use Illuminate\Database\Eloquent\Factories\Factory;

class PurchasedProductFactory extends Factory {

  protected $model = PurchasedProduct::class;

  public function definition() {
    return [
      'purchase_id' => $this->faker->numberBetween(2, 5),
      'product_id' => $this->faker->numberBetween(2, 6),
      'quantity' => $this->faker->numberBetween(1, 10),
      'per_item_cost' => $this->faker->randomFloat(2, 10, 500),
      'total_cost' => $this->faker->randomFloat(2, 1000, 50000),
    ];
  }
}
