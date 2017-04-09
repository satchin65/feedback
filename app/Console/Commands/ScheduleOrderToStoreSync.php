<?php

namespace App\Console\Commands;

use App\Jobs\ProcessOrderToStoreSync;
use App\Order;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Log;


class ScheduleOrderToStoreSync extends Command
{



    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'marketplace:ordersync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Starts scheduling order synchonisation to stores';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        Log::info('Schedule: Order to Store sync');
        $orders = Order::where('store_order_id',null)->where('created_at', '>' ,Carbon::now()->subDays(3))->get();
        $orders->each(function($order){
            $this->scheduleStoreSync($order);
        });
    }

    private function scheduleStoreSync($order)
    {
        dispatch(new ProcessOrderToStoreSync($order));
    }
}
