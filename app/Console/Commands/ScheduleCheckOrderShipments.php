<?php

namespace App\Console\Commands;

use App\Jobs\ProcessNotShippedOrders;
use App\Order;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class ScheduleCheckOrderShipments extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'marketplace:checkshipments';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check if there are any orders that are shipped as double check if push api does not pick it up';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        Log::info('Schedule: check for shipments');

        $orders = Order::whereNotNull('store_order_id')->where('marketplace_send_at', null)->where('created_at', '>' ,Carbon::now()->subDays(30))->get();

        $orders->each(function($order){
            $this->scheduleShipmentCheckJob($order);
        });

    }

    private function scheduleShipmentCheckJob($order)
    {
        dispatch(new ProcessNotShippedOrders($order));
    }
}
