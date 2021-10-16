<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIndexToSuppliersTable extends Migration
{

    public function up()
    {
        Schema::table('suppliers', function (Blueprint $table) {
            $table->unique(['shop_id', 'email']);
        });
    }

    public function down()
    {
        Schema::table('suppliers', function (Blueprint $table) {
            $table->dropIndex('suppliers_shop_id_email_unique');
        });
    }
}
