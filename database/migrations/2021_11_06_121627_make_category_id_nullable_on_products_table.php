<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeCategoryIdNullableOnProductsTable extends Migration {

  public function up() {
    Schema::table('products', function (Blueprint $table) {
      $table->bigInteger('category_id')->nullable()->unsigned()->change();
    });
  }

  public function down() {
    Schema::table('products', function (Blueprint $table) {
      $table->bigInteger('category_id')->unsigned()->change();
    });
  }
}
