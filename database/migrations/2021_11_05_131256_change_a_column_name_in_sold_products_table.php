<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Grammars\RenameColumn;
use Illuminate\Support\Facades\Schema;

class ChangeAColumnNameInSoldProductsTable extends Migration {
  public function up() {
    Schema::table('sold_products', function (Blueprint $table) {
      $table->renameColumn('discounted_sale_price', 'final_sale_price');
    });
  }

  public function down() {
    Schema::table('sold_products', function (Blueprint $table) {
      $table->renameColumn('final_sale_price', 'discounted_sale_price');
    });
  }
}
