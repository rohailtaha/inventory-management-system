<?php

namespace Database\Factories;

use App\Models\SoldProduct;
use Illuminate\Database\Eloquent\Factories\Factory;

class SoldProductFactory extends Factory {

  protected $model = SoldProduct::class;

  public function definition() {
    return [
      'sale_id' => $this->faker->numberBetween(5, 8),
      'product_id' => $this->faker->numberBetween(1, 40),
      'sale_price' => 250.00,
      'discount' => 2.00,
      'discounted_sale_price' => 240.00,
      'quantity' => 3,
      'net_total' => 720.00,
    ];
  }
}
