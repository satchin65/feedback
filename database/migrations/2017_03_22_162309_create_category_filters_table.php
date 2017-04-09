<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoryFiltersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('category_filters', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('feed_id')->unsigned()->index()->nullable();
            $table->integer('marketplace_id')->unsigned()->index()->nullable();
            $table->integer('category_id')->unsigned()->nullable();
            $table->string('field')->nullable();
            $table->string('filter')->nullable();
            $table->string('value')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('active')->default(1);

            $table->foreign('feed_id')
                ->references('id')->on('feeds')
                ->onDelete('cascade');

            $table->foreign('marketplace_id')
                ->references('id')->on('marketplaces')
                ->onDelete('cascade');

            $table->foreign('category_id')
                ->references('id')->on('categories')
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
        Schema::dropIfExists('category_filters');
    }
}
