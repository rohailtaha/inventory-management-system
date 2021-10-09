<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();

            $table->integer('shop_id')->unsigned();
            $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade')->onUpdate('cascade');

            $table->string('barcode');
            $table->string('name');

            $table->bigInteger('category_id')->unsigned();
            $table->foreign('category_id')->references('id')->on('categories')->onUpdate('cascade');

            $table->string('description')->nullable();
            $table->integer('quantity')->unsigned();
            $table->mediumInteger('stock_alert')->unsigned();
            $table->bigInteger('purchase_price')->unsigned();
            $table->smallInteger('profit_margin')->unsigned();
            $table->bigInteger('sale_price')->unsigned();
            $table->tinyInteger('discount')->unsigned();
            $table->bigInteger('discounted_sale_price')->unsigned();
            
            $table->timestamps();

            $table->unique(['shop_id', 'name']);
            $table->unique(['shop_id', 'barcode']);
        });
            
        DB::statement('ALTER TABLE products ADD CONSTRAINT check_discount_range_for_product CHECK(discount BETWEEN 0 AND 100)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
