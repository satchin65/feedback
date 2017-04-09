<?php

namespace App\Console\Commands;

use App\Jobs\ProcessMarketplaceOrdersImport;
use App\Marketplace;
use Illuminate\Console\Command;
use Log;

class importMarketplaceOrders extends Command
{

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'orders:import';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import marketplace orders';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function handle()
    {
        Log::info('Schedule: Import marketplace orders');
        $marketplaces = Marketplace::where('active',1)->get();
        $marketplaces->each(function($marketplace){
            $this->scheduleOrderImport($marketplace);
        });


    }

    private function scheduleOrderImport($marketplace)
    {
        dispatch(new ProcessMarketplaceOrdersImport($marketplace));
    }
}
