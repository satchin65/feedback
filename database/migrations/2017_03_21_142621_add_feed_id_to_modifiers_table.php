<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFeedIdToModifiersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('modifiers', function ($table) {
            $table->integer('feed_id')->unsigned()->nullable();
            $table->foreign('feed_id')
                ->references('id')->on('feeds')
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
            $table->dropColumn('feed_id');
        });
    }
}
