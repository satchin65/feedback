<?php

namespace App\Console\Commands;

use App\Jobs\ProcessMarketplaceEntityProducts;
use App\Jobs\ProcessMarketplaceProducts;
use App\Marketplace;
use App\Product;
use App\ProductStatistics;
use Illuminate\Console\Command;
use Log;

class ProcessAllMarketplaceProducts extends Command
{

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'marketplace:process';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'processes all marketplace products';


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
        Log::info('Schedule: Marketplace total sync');
        $marketplaces = Marketplace::where('active',1)->has('channelmappings')->get();
        $marketplaces->each(function($marketplace){
            $this->scheduleSyncJob($marketplace);
        });

    }

    private function scheduleSyncJob($marketplace)
    {
        $products = $marketplace->getProcessableProducts();

        $productChunck = array_chunk($products,25);
        foreach ($productChunck as $chunk)
        {
            dispatch(new ProcessMarketplaceProducts($marketplace, $chunk));
            //dispatch(new ProcessMarketplaceEntityProducts($marketplace, $chunk));
        }
    }


}
