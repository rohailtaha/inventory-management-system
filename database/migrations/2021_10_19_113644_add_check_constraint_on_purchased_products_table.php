<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class AddCheckConstraintOnPurchasedProductsTable extends Migration {

  public function up() {
    DB::statement('ALTER TABLE purchased_products ADD CONSTRAINT check_total_cost_is_correctly_calculated CHECK(total_cost =  quantity * per_item_cost)');
  }

  public function down() {
    DB::statement('ALTER TABLE purchased_products DROP CONSTRAINT check_total_cost_is_correctly_calculated');
  }
}
