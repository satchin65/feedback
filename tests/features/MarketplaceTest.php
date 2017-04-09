<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MarketplaceTest extends BrowserKitTestCase
{
    use DatabaseTransactions;

    /** @test */
    public function user_can_add_marketplace()
    {
        $marketplace = factory(App\Marketplace::class)->create();
        $this->seeInDatabase('marketplaces', ['name'=>$marketplace->name]);
    }
}
