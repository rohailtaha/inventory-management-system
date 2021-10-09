<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreatePurchasedProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purchased_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('purchase_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('product_id')->nullable()->constrained()->onUpdate('cascade')->onDelete('set null');
            $table->integer('quantity')->unsigned();
            $table->integer('per_item_cost')->unsigned();
            $table->bigInteger('total_cost')->unsigned();

            $table->unique(['purchase_id', 'product_id']);
        });

        DB::statement('ALTER TABLE purchased_products ADD CONSTRAINT compare_total_cost_and_per_item_cost CHECK(per_item_cost <= total_cost)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('purchased_products');
    }
}
