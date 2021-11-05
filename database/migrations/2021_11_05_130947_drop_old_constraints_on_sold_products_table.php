<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class DropOldConstraintsOnSoldProductsTable extends Migration {

  public function up() {
    DB::statement('ALTER TABLE sold_products DROP CONSTRAINT discounted_sale_price_less_than_equals_per_item_price');
    DB::statement('ALTER TABLE sold_products DROP CONSTRAINT rightly_calculated_total_price');
  }

  public function down() {
    //
  }
}
