<?php

namespace Database\Factories;

use App\Models\Purchase;
use Illuminate\Database\Eloquent\Factories\Factory;

class PurchaseFactory extends Factory {

  protected $model = Purchase::class;

  public function definition() {
    return [
      'shop_id' => 1,
      'purchase_status' => 'Received',
      'grand_total' => $this->faker->randomFloat(2, 500, 10000),
      'amount_paid' => $this->faker->randomFloat(2, 0, 499),
      'payment_status' => 'Partial',
      'supplier_id' => $this->faker->numberBetween(6, 9),
    ];
  }
}
