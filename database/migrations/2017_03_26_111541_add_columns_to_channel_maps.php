<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsToChannelMaps extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('channel_maps', function ($table) {
            $table->integer('recommended')->default(0);
            $table->string('description')->nullable();
            $table->string('example')->nullable();
            $table->string('format')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('channel_maps', function ($table) {
            $table->dropColumn('recommended');
            $table->dropColumn('description');
            $table->dropColumn('example');
            $table->dropColumn('format');
        });
    }
}
