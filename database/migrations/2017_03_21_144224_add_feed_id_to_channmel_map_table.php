<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFeedIdToChannmelMapTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('channel_mappings', function ($table) {
            $table->integer('feed_id')->unsigned()->nullable()->index();
            $table->foreign('feed_id')
                ->references('id')->on('feeds')
                ->onDelete('cascade');

            // Was still missing on original migration
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
        Schema::table('modifiers', function ($table) {
            $table->dropForeign('feed_id');
            $table->dropForeign('marketplace_id');
            $table->dropColumn('feed_id');
        });
    }
}
