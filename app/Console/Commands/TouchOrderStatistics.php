<?php

namespace App\Console\Commands;

use App\Marketplace;
use App\OrderStatistics;
use Carbon\Carbon;
use Illuminate\Console\Command;

class TouchOrderStatistics extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'statistics:orders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Touch order statistics for all marketplaces';

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

        $marketplaces = Marketplace::all();
        $marketplaces->each(function($marketplace){
           OrderStatistics::add_current_total_revenue_amount(Carbon::now(),$marketplace);
        });

    }
}
