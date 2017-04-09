<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProcessedFeedProductLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('processed_feed_product_logs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('processed_feed_product_id')->unsigned();
            $table->string('status');
            $table->integer('score');
            $table->string('description')->nullable();

            $table->foreign('processed_feed_product_id')
                ->references('id')->on('processed_feed_products')
                ->onDelete('cascade');

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
        Schema::dropIfExists('processed_feed_product_logs');
    }
}
