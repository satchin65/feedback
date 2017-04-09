<?php

namespace App\Jobs;

use App\Marketplace;
use App\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class ProcessShippedOrder implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 5; // max attempts
    public $timeout = 180; // 3 minutes


    /**
     * @var Marketplace
     */
    private $marketplace;
    private $marketplaceClient;
    private $order;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Marketplace $marketplace, Order $order)
    {
        $this->marketplace = $marketplace;
        $entity = 'App\Marketplaces\Entities\\'.$this->marketplace->entity;
        $entityClass = new $entity();
        $this->marketplaceClient = new \App\Marketplaces\MarketplaceClient($entityClass, $marketplace);
        $this->order = $order;

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->order->items()->get()->each(function($item){
            $this->marketplaceClient->sendShippedOrder($this->order, $item);
        });
    }
}
