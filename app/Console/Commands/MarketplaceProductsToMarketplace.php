<?php

namespace App\Console\Commands;

use App\Jobs\ProcessMarketplaceEntityProducts;
use App\Marketplace;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class MarketplaceProductsToMarketplace extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'marketplace:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get the to be updated products to be send to Marketplace API';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        Log::info('Marketplace: sending products to marketplace');
        $marketplaces = Marketplace::where('active',1)->has('channelmappings')->get();
        $marketplaces->each(function($marketplace){
            $this->scheduleSyncJob($marketplace);
        });

    }

    private function scheduleSyncJob($marketplace)
    {
        $products = $marketplace->getToBeUpdatedProducts();

        foreach ($products->chunk(25) as $chunk)
        {
            dispatch(new ProcessMarketplaceEntityProducts($marketplace, $chunk));
        }
    }
}
