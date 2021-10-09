<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'shop_id' => 1,
            'barcode' => $this->faker->ean8(),
            'name' => $this->faker->name(),
            'category_id' => $this->faker->numberBetween(1,2),
            'description' => $this->faker->text(),
            'quantity' => $this->faker->numberBetween(20,1000),
            'stock_alert' => $this->faker->numberBetween(2,15),
            'purchase_price' => $this->faker->randomFloat(2, 100, 1000000),
            'profit_margin' => $this->faker->numberBetween(5,10),
            'sale_price' => $this->faker->randomFloat(2),
            'discount' => $this->faker->randomFloat(2,0,100),
            'discounted_sale_price' => $this->faker->randomFloat(2),

        ];
    }
}
