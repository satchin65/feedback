<?php

namespace App\Jobs;

use App\Connectors\MagentoOrderProcessor;
use App\Connectors\OrderProcessor;
use App\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class ProcessOrderToStoreSync implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 5; // max attempts
    public $timeout = 180; // 3 minutes
    protected $order;
    protected $orderProcessor;


    public function __construct(Order $order)
    {
        $this->order = $order;
        $this->orderProcessor = new OrderProcessor(new MagentoOrderProcessor);
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->orderProcessor->postOrder($this->order);
    }
}
