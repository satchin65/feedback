<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddConnectionsQueueColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('connections', function ($table) {
            $table->boolean('scheduled')->default(0);
            $table->boolean('running')->default(0);
            $table->boolean('failed')->default(0);
            $table->datetime('last_run_date')->nullable();
            $table->datetime('last_completed_date')->nullable();
            $table->datetime('last_failed_date')->nullable();
            $table->datetime('scheduled_at')->nullable();
            $table->string('frequency')->default('daily');
            $table->integer('hour')->default('00');
            $table->integer('minute')->default('00');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('connections', function ($table) {
            $table->dropColumn('scheduled')->default(0);
            $table->dropColumn('running')->default(0);
            $table->dropColumn('failed')->default(0);
            $table->dropColumn('last_run_date');
            $table->dropColumn('last_completed_date');
            $table->dropColumn('last_failed_date');
            $table->dropColumn('frequency');
            $table->dropColumn('hour');
            $table->dropColumn('minute');
            $table->dropColumn('scheduled_at');
        });
    }
}
