<?php

namespace Database\Factories;

use App\Models\Sale;
use Illuminate\Database\Eloquent\Factories\Factory;

class SaleFactory extends Factory {

  protected $model = Sale::class;

  public function definition() {
    return [
      'shop_id' => 1,
      'customer_id' => $this->faker->numberBetween(12, 17),
      'grand_total' => $this->faker->randomFloat(2, 500, 10000),
      'payment_received' => $this->faker->randomFloat(2, 500, 12000),
      'payment_returned' => $this->faker->randomFloat(2, 500, 1000),
      'net_payment' => $this->faker->randomFloat(2, 500, 10000),
      'payment_status' => 'Paid',
    ];
  }
}
