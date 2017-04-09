<?php

namespace Tests\Feature;

use App\Connectors\Magento2OrderProcessor;
use App\Connectors\MagentoOrderProcessor;
use App\Connectors\OrderProcessor;
use App\Marketplace;
use TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class Magento1OrderSyncTest extends TestCase
{


    /** @test */
    public function testApiValidTest()
    {
        $marketplace = Marketplace::find(1);
        $store = $marketplace->store;

        $this->assertEquals(1,$marketplace->active);
        $this->assertNotEmpty($store->api_key);
        $this->assertContains('Connected succesfully', $store->getApiStatus());
    }

    /** @test */
    public function get_unknown_sku_error_when_unknown_sku_is_posted()
    {
        $marketplace = Marketplace::find(1);
        $order = $marketplace->orders()->orderBy('id','DESC')->first()->load('items','customer');
        $orderProcessor = new OrderProcessor(new MagentoOrderProcessor);

        $this->assertContains('not found in store', $orderProcessor->postOrder($order)->error);

    }


    /** @test */
    public function post_the_order_using_magento()
    {
        $marketplace = Marketplace::find(1);
        $order = $marketplace->orders()->first()->load('items','customer');
        $order->store_order_id = '';
        $order->save();
        $orderProcessor = new OrderProcessor(new MagentoOrderProcessor);

        $orderResult = $orderProcessor->postOrder($order);
        $this->assertContains('Successfully synced order', $orderResult);

    }
}
