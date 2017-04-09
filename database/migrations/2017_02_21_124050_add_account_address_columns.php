<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAccountAddressColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('accounts', function ($table) {
            $table->string('language')->default('en');
            $table->string('address')->nullable();
            $table->string('address2')->nullable();
            $table->string('zipcode')->nullable();
            $table->string('city')->nullable();
            $table->string('tax_id')->nullable();
            $table->string('country')->nullable();
            $table->string('email')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('accounts', function ($table) {
            $table->dropColumn('language');
            $table->dropColumn('address');
            $table->dropColumn('address2');
            $table->dropColumn('zipcode');
            $table->dropColumn('city');
            $table->dropColumn('tax_id');
            $table->dropColumn('country');
            $table->dropColumn('email');
        });
    }
}
