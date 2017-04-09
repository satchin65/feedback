<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChargesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('charges', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('subscription_id')->unsigned()->index();
            $table->string('mollie_id');
            $table->string('mode')->nullable();
            $table->float('amount', 8, 2);
            $table->string('description')->nullable();
            $table->string('method')->nullable();
            $table->string('status');
            $table->string('expiry_period')->nullable();
            $table->timestamp('created_datetime')->nullable();
            $table->timestamp('paid_datetime')->nullable();
            $table->timestamp('cancelled_datetime')->nullable();
            $table->timestamp('expired_datetime')->nullable();
            $table->string('profile_id')->nullable();
            $table->string('customer_id')->nullable();
            $table->string('recurring_type')->nullable();
            $table->string('mandate_id')->nullable();
            $table->string('mollie_subscription_id')->nullable();
            $table->string('locale')->nullable();
            $table->text('metadata')->nullable();
            $table->text('details')->nullable();
            $table->string('paymenturl')->nullable();
            $table->foreign('subscription_id')
                ->references('id')->on('subscriptions')
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
        Schema::dropIfExists('charges');
    }
}
