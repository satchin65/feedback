<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class FeedProcessProductsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;


    private $feedClient;
    private $products;
    private $feed;
    public $tries = 5; // max attempts
    public $timeout = 180; // 3 minutes


    /**
     * ProcessMarketplaceProducts constructor.
     * @param $marketplace \App\Marketplace
     * @param $chunk [array]
     */
    public function __construct($feed, $products)
    {

        $entity = 'App\Feeds\Entities\\'.$feed->entity;
        $this->feedClient = new $entity();
        $this->products = $products;
        $this->feed = $feed;


    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        $this->feedClient->processProducts($this->feed, $this->products);
    }
}
