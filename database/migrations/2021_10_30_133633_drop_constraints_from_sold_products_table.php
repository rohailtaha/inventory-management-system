<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DropConstraintsFromSoldProductsTable extends Migration {

  public function up() {
    DB::statement('ALTER TABLE sold_products DROP CONSTRAINT discounted_sale_price_less_than_equals_sale_price');
    DB::statement('ALTER TABLE sold_products DROP CONSTRAINT rightly_calculated_net_total');
  }

  public function down() {
    Schema::table('sold_products', function (Blueprint $table) {
      DB::statement('ALTER TABLE sold_products ADD CONSTRAINT discounted_sale_price_less_than_equals_sale_price CHECK(discounted_sale_price <= sale_price)');
      DB::statement('ALTER TABLE sold_products ADD CONSTRAINT rightly_calculated_net_total CHECK(net_total = discounted_sale_price * quantity)');
    });
  }
}
