<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeAmountDataTypesInSalesTable extends Migration {

  public function up() {
    Schema::table('sales', function (Blueprint $table) {
      $table->decimal('grand_total', 16, 2)->unsigned()->change();
      $table->decimal('payment_received', 16, 2)->unsigned()->change();
      $table->decimal('payment_returned', 16, 2)->unsigned()->change();
      $table->decimal('net_payment', 16, 2)->unsigned()->change();
    });
  }

  public function down() {
    Schema::table('sales', function (Blueprint $table) {
      $table->bigInteger('grand_total', 16, 2)->change();
      $table->bigInteger('payment_received', 16, 2)->change();
      $table->bigInteger('payment_returned', 16, 2)->change();
      $table->bigInteger('net_payment', 16, 2)->change();
    });
  }
}
