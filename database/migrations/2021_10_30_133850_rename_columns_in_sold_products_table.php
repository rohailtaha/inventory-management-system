<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameColumnsInSoldProductsTable extends Migration {

  public function up() {
    Schema::table('sold_products', function (Blueprint $table) {
      $table->renameColumn('sale_price', 'per_item_price');
      $table->renameColumn('net_total', 'total_price');
    });
  }

  public function down() {
    Schema::table('sold_products', function (Blueprint $table) {
      $table->renameColumn('per_item_price', 'sale_price');
      $table->renameColumn('total_price', 'net_total');
    });
  }
}
