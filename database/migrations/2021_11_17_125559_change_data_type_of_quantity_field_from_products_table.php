<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeDataTypeOfQuantityFieldFromProductsTable extends Migration {

  public function up() {
    Schema::table('products', function (Blueprint $table) {
      $table->bigInteger('quantity')->change();
    });
  }

  public function down() {
    Schema::table('products', function (Blueprint $table) {
      $table->integer('quantity')->unsigned();
    });
  }
}
