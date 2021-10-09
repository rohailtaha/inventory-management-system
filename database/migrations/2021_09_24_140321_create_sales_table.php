<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id();

            $table->integer('shop_id')->unsigned();
            $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade')->onUpdate('cascade');

            $table->foreignId('customer_id')->nullable()->constrained()->onUpdate('cascade')->onDelete('set null');

            $table->bigInteger('grand_total')->unsigned();
            $table->bigInteger('payment_received')->unsigned();
            $table->bigInteger('payment_returned')->unsigned();
            $table->bigInteger('net_payment')->unsigned();
            $table->string('payment_status');
            $table->timestamps();
        });

        DB::statement("ALTER TABLE sales ADD CONSTRAINT check_payment_status_for_sale CHECK(payment_status IN ('Paid', 'Unpaid', 'Partial'))");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales');
    }
}
