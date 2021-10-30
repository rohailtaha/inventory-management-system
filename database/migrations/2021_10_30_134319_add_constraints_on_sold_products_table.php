<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class AddConstraintsOnSoldProductsTable extends Migration {

  public function up() {

    DB::statement('ALTER TABLE sold_products ADD CONSTRAINT discounted_sale_price_less_than_equals_per_item_price CHECK(discounted_sale_price <= per_item_price)');
    DB::statement('ALTER TABLE sold_products ADD CONSTRAINT rightly_calculated_total_price CHECK(total_price = discounted_sale_price * quantity)');
  }

  public function down() {
    DB::statement('ALTER TABLE sold_products DROP CONSTRAINT discounted_sale_price_less_than_equals_per_item_price');
    DB::statement('ALTER TABLE sold_products DROP CONSTRAINT rightly_calculated_total_price');
  }
}
