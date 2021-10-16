<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory {
  protected $model = Customer::class;

  public function definition() {
    return [
      'shop_id' => 1,
      'name' => $this->faker->name(),
      'email' => $this->faker->email(),
      'phone' => $this->faker->phoneNumber(),
      'address' => $this->faker->address(),
    ];
  }
}
