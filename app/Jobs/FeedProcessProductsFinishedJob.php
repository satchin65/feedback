<?php

namespace App\Jobs;

use App\Feed;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Artisan;

class FeedProcessProductsFinishedJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $feed;
    public $tries = 5; // max attempts
    public $timeout = 180; // 3 minutes


    /**
     * ProcessMarketplaceProducts constructor.
     * @param $marketplace \App\Marketplace
     * @param $chunk [array]
     */
    public function __construct($feed)
    {

        $this->feed = $feed;
        $this->feed->processing_products = 0;
        $this->feed->save();
        Artisan::call('feeds:generate', [
            'feed' => $this->feed->id
        ]);
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        return true;
    }
}
