<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddInvoiceIdFieldOnSalesTable extends Migration {

  public function up() {
    Schema::table('sales', function (Blueprint $table) {
      $table->bigInteger('invoice_id')->after('shop_id');
    });
  }

  public function down() {
    Schema::table('sales', function (Blueprint $table) {
      $table->dropColumn('invoice_id');
    });
  }
}
