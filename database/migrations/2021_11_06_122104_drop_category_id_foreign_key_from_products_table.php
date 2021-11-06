<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropCategoryIdForeignKeyFromProductsTable extends Migration {

  public function up() {
    Schema::table('products', function (Blueprint $table) {
      $table->dropForeign('products_category_id_foreign');
    });
  }

  public function down() {
    Schema::table('products', function (Blueprint $table) {
      $table->foreign('category_id')->references('id')->on('categories')->onUpdate('cascade');
    });
  }
}
