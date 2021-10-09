<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuppliersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->integer('shop_id')->unsigned();
            $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade')->onUpdate('cascade');
            $table->string('name');
            $table->string('contact');
            $table->string('address');
            $table->timestamps();
            $table->unique(['shop_id', 'name']);
            $table->unique(['shop_id', 'contact']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('suppliers');
    }
}
