<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateModifiersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('modifiers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('marketplace_id')->nullable()->unsigned();
            $table->string('name');
            $table->boolean('paused')->default(0);
            $table->integer('order')->default(0);
            $table->timestamps();

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
        Schema::dropIfExists('modifiers');
    }
}
