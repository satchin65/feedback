<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddScheduleToStore extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('stores', function ($table) {
            $table->string('schedule_frequency')->default('daily');
            $table->string('schedule_hour')->default('02');
            $table->string('schedule_minute')->default('00');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('stores', function ($table) {
            $table->dropColumn('schedule_frequency');
            $table->dropColumn('schedule_hour');
            $table->dropColumn('schedule_minute');
        });
    }
}
