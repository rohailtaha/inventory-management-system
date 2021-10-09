<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
           $table->id();
            $table->integer('shop_id')->unsigned();
            $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade')->onUpdate('cascade');
            $table->string('name');
            $table->string('username')->unique();
            $table->string('password');
            $table->string('email')->unique()->nullable();
            $table->string('phone')->unique();
            $table->boolean('active');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
