<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('order_id')->unsigned();
            $table->string('order_item_reference');
            $table->string('ean');
            $table->string('offer_reference')->nullable();
            $table->string('title')->nullable();
            $table->integer('qty');
            $table->decimal('price', 12, 4)->default(0);
            $table->decimal('fee', 12, 4)->default(0);
            $table->dateTime('promised_delivery')->nullable();
            $table->string('condition')->nullable();
            $table->boolean('cancelrequest')->default(0);
            $table->boolean('shipped')->default(0);
            $table->boolean('cancelled')->default(0);
            $table->string('transportcode')->nullable();
            $table->string('tracktrace')->nullable();
            $table->dateTime('shipment_date')->nullable();
            $table->dateTime('expected_delivery')->nullable();

            $table->timestamps();

            $table->foreign('order_id')
                ->references('id')->on('orders')
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
        Schema::dropIfExists('order_items');
    }
}
