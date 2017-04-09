<?php

use App\Jobs\ProcessShippedOrder;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ExampleTest extends BrowserKitTestCase
{
    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testBasicExample()
    {
        $this->visit('/')
             ->see('Laravel');
    }

    public function testOrderJob()
    {
        $order = \App\Order::find(3);

        dispatch(new ProcessShippedOrder($order->marketplace, $order));
    }

}
