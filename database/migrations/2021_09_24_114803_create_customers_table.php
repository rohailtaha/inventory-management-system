<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->integer('shop_id')->unsigned();
            $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade')->onUpdate('cascade');
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone');
            $table->string('address');

            $table->unique(['shop_id', 'name']);
            $table->unique(['shop_id', 'phone']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customers');
    }
}
