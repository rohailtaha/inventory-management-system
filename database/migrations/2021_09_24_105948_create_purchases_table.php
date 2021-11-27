<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreatePurchasesTable extends Migration {

  public function up() {
    Schema::create('purchases', function (Blueprint $table) {
      $table->id();
      $table->integer('shop_id')->unsigned();
      $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade')->onUpdate('cascade');
      $table->string('purchase_status');
      $table->bigInteger('grand_total');
      $table->bigInteger('amount_paid');
      $table->string('payment_status');

      $table->foreignId('supplier_id')->nullable()->constrained()->onDelete('set null')->onUpdate('cascade');

      $table->timestamps();
    });

    DB::statement("ALTER TABLE purchases ADD CONSTRAINT check_payment_status_for_purchase CHECK(payment_status IN ('Paid', 'Unpaid', 'Partial'))");
    DB::statement("ALTER TABLE purchases ADD CONSTRAINT check_purchase_status CHECK(purchase_status IN ('Received', 'Pending'))");
  }

  public function down() {
    Schema::dropIfExists('purchases');
  }
}
