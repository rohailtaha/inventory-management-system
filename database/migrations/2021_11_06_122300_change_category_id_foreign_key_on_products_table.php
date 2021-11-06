<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeCategoryIdForeignKeyOnProductsTable extends Migration {

  public function up() {
    Schema::table('products', function (Blueprint $table) {
      $table->foreign('category_id')->references('id')->on('categories')->onUpdate('cascade')->onDelete('set null');
    });
  }

  public function down() {
    //
  }
}
