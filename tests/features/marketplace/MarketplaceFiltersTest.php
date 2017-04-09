<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MarketplaceFiltersTest extends BrowserKitTestCase
{
    use DatabaseTransactions;

    /** @test */
    public function user_can_add_modifier_to_marketplace()
    {
        $marketplace = \App\Marketplace::first();
        $current = $marketplace->modifiers()->count();
        $marketplace->modifiers()->create([
            'name' => 'test',
        ]);

        $this->assertEquals($current+1, $marketplace->modifiers()->count());
    }

    /** @test */
    public function user_can_add_filter_to_modifier()
    {
        $marketplace = \App\Marketplace::first();
        $modifier = $marketplace->modifiers()->create([
            'name' => 'test',
        ]);

        $modifier->filters()->create([
            'parent_id' => 0,
            'field' => 'price',
            'filter' => 'greater_then',
            'value' => '10'
        ]);

        $this->assertEquals(1, $modifier->filters()->count());
    }


    /** @test */
    public function user_can_add_action_to_modifier()
    {
        $marketplace = \App\Marketplace::first();
        $modifier = $marketplace->modifiers()->create([
            'name' => 'test',
        ]);

        $modifier->actions()->create([
            'action' => 'set',
            'field' => 'price',
            'value' => '9'
        ]);

        $this->assertEquals(1, $modifier->actions()->count());
    }
}
