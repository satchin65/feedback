<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProcessedProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('processed_products', function (Blueprint $table) {

            $table->increments('id');
            $table->integer('marketplace_id')->unsigned();
            $table->string('reference');
            $table->string('marketplace_reference')->nullable();
            $table->float('price');
            $table->float('price_original');
            $table->integer('stock')->default(0);
            $table->boolean('update')->default(0);
            $table->string('status')->nullable();
            $table->json('payload');

            $table->foreign('marketplace_id')
                ->references('id')->on('marketplaces')
                ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('processed_products');
    }
}
