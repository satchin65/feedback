<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('store_id')->unsigned();

            $table->boolean('active')->default(1);
            $table->boolean('visible')->default(1);
            $table->boolean('is_parent')->default(0); // only for parent 1 = parent 0 = not configurable or child

            $table->integer('parent_id')->nullable();
            $table->integer('brand_id')->unsigned()->nullable();

            $table->string('sku')->index();
            $table->string('ean')->nullable()->index();
            $table->string('name')->nullable()->index();

            $table->string('color')->nullable()->index();
            $table->string('material')->nullable()->index();
            $table->string('gender')->nullable()->index();

            $table->integer('stock')->nullable();
            $table->date('stockdate')->nullable();
            $table->string('delivery_time')->nullable();
            $table->string('delivery_time_out_of_stock')->nullable();

            $table->decimal('price', 12, 4)->default(0)->index();
            $table->decimal('cost', 12, 4)->default(0)->index();
            $table->decimal('special_price', 12, 4)->default(0)->index();

            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();

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
        Schema::dropIfExists('products');
    }
}
