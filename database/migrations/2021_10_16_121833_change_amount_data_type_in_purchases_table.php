<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeAmountDataTypeInPurchasesTable extends Migration {

  public function up() {
    Schema::table('purchases', function (Blueprint $table) {
      $table->decimal('grand_total', 16, 2)->unsigned()->change();
      $table->decimal('amount_paid', 16, 2)->unsigned()->change();
    });
  }

  public function down() {
    Schema::table('purchases', function (Blueprint $table) {
      $table->bigInteger('grand_total')->change();
      $table->bigInteger('amount_paid')->change();
    });
  }
}
