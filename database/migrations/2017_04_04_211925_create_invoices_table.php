<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->integer('account_id')->unsigned()->nullable();
            $table->integer('subscription_id')->unsigned()->nullable();
            $table->integer('charge_id')->unsigned()->nullable();
            $table->string('company')->nullable();
            $table->string('address')->nullable();
            $table->string('zipcode')->nullable();
            $table->string('city')->nullable();
            $table->string('tax_id')->nullable();
            $table->string('country')->nullable();
            $table->string('email')->nullable();
            $table->string('description')->nullable();
            $table->float('tax', 8, 2)->default(0.00);
            $table->float('amount', 8, 2)->default(0.00);
            $table->float('total', 8, 2)->default(0.00);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
        DB::update("ALTER TABLE invoices AUTO_INCREMENT = 101700;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoices');
    }
}
