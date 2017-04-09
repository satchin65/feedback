<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class ProcessMarketplaceEntityProducts implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;


    private $marketplaceClient;
    private $products;
    public $tries = 5; // max attempts
    public $timeout = 180; // 3 minutes
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($marketplace, $chunk)
    {
        $entity = 'App\Marketplaces\Entities\\'.$marketplace->entity;
        $entityClass = new $entity();
        $this->marketplaceClient = new \App\Marketplaces\MarketplaceClient($entityClass, $marketplace);
        $this->products = $chunk;

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->marketplaceClient->postProducts($this->products);
    }
}
