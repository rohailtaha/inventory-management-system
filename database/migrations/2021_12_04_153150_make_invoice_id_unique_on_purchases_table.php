<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeInvoiceIdUniqueOnPurchasesTable extends Migration {

  public function up() {
    Schema::table('purchases', function (Blueprint $table) {
      $table->unique(['shop_id', 'invoice_id']);
    });
  }

  public function down() {
    //
  }
}
