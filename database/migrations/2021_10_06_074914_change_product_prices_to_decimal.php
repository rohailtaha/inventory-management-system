<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeProductPricesToDecimal extends Migration {

  public function up() {
    Schema::table('products', function (Blueprint $table) {
      $table->decimal('purchase_price', 14, 2)->unsigned()->change();
      $table->decimal('sale_price', 14, 2)->unsigned()->change();
      $table->decimal('discounted_sale_price', 14, 2)->unsigned()->change();
      $table->decimal('profit_margin', 7, 2)->unsigned()->change();
      $table->decimal('discount', 5, 2)->unsigned()->change();
    });
  }

  public function down() {
    Schema::table('products', function (Blueprint $table) {
      $table->bigInteger('purchase_price')->unsigned()->change();
      $table->bigInteger('sale_price')->unsigned()->change();
      $table->bigInteger('discounted_sale_price')->unsigned()->change();
      // $table->smallInteger('profit_margin')->unsigned()->change();
      // $table->tinyInteger('discount')->unsigned()->change();
    });
  }
}
