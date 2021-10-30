<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeNumericDataTypesInSoldProductsTable extends Migration {

  public function up() {
    Schema::table('sold_products', function (Blueprint $table) {
      $table->decimal('sale_price', 14, 2)->unsigned()->change();
      $table->decimal('discount', 5, 2)->unsigned()->change();
      $table->decimal('discounted_sale_price', 14, 2)->unsigned()->change();
      $table->decimal('net_total', 16, 2)->unsigned()->change();
    });
  }

  public function down() {
    Schema::table('sold_products', function (Blueprint $table) {
      $table->integer('sale_price')->unsigned()->change();
      $table->tinyInteger('discount')->unsigned()->change();
      $table->integer('discounted_sale_price')->unsigned()->change();
      $table->bigInteger('net_total')->unsigned()->change();
    });
  }
}
