<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFiltersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('filters', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('modifier_id')->unsigned();
            $table->integer('parent_id')->unsigned()->nullable();
            $table->string('field')->nullable();
            $table->string('filter')->nullable();
            $table->string('value')->nullable();
            $table->timestamps();
            $table->foreign('modifier_id')
                ->references('id')->on('modifiers')
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
        Schema::dropIfExists('filters');
    }
}
