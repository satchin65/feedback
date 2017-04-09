<?php

use App\Marketplace;
use App\Product;
use App\Store;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class FilterTest extends BrowserKitTestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $marketplace = Marketplace::find(3);
        $productsWithoutFilter = Product::where('store_id',$marketplace->store_id)->get();

        $this->assertEquals(26,$productsWithoutFilter->count());
    }


    public function testWithFilters()
    {
        $marketplace = Marketplace::find(3);
        $productsWithoutFilter = Product::where('store_id',$marketplace->store_id)->ProcessMarketplaceFilters($marketplace);
        $productsWithoutFilter = collect($productsWithoutFilter);
        dd($productsWithoutFilter);
        $this->assertEquals(10,$productsWithoutFilter->count());
    }
}
