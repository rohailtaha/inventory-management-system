<?php

namespace Database\Factories;

use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

class SupplierFactory extends Factory
{

    protected $model = Supplier::class;
    
    public function definition()
    {
        return [
            'shop_id' => 1,
            'name' => $this->faker->name(),
            'contact' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
        ];
    }
}
