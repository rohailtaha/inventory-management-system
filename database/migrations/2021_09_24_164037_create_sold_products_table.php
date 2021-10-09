<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateSoldProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sold_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sale_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('product_id')->nullable()->constrained()->onUpdate('cascade')->onDelete('set null');
            $table->integer('sale_price')->unsigned();
            $table->tinyInteger('discount')->unsigned();
            $table->integer('discounted_sale_price')->unsigned();
            $table->integer('quantity')->unsigned();
            $table->bigInteger('net_total')->unsigned();
            
            $table->unique(['sale_id', 'product_id']);

        });

        DB::statement('ALTER TABLE sold_products ADD CONSTRAINT check_discount_range_for_sale CHECK(discount BETWEEN 0 AND 100)');
        DB::statement('ALTER TABLE sold_products ADD CONSTRAINT discounted_sale_price_less_than_equals_sale_price CHECK(discounted_sale_price <= sale_price)');
        DB::statement('ALTER TABLE sold_products ADD CONSTRAINT rightly_calculated_net_total CHECK(net_total = discounted_sale_price * quantity)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sold_products');
    }
}
