<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChannelMappingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('channel_mappings', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('marketplace_id')->unsigned()->nullable()->index();
            $table->string('field'); // field from the channel_map
            $table->string('source')->nullable(); // source field from the data mapper / products table
            $table->string('value')->nullable();
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
        Schema::dropIfExists('channel_mappings');
    }
}
