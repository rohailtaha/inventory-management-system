<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeNumericDataTypesInPurchasedProductsTable extends Migration {

  public function up() {
    Schema::table('purchased_products', function (Blueprint $table) {
      $table->decimal('per_item_cost', 14, 2)->unsigned()->change();
      $table->decimal('total_cost', 16, 2)->unsigned()->change();
    });
  }

  public function down() {
    Schema::table('purchased_products', function (Blueprint $table) {
      $table->integer('per_item_cost')->unsigned()->change();
      $table->bigInteger('total_cost')->unsigned()->change();
    });
  }
}
