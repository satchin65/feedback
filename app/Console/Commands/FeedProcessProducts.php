<?php

namespace App\Console\Commands;

use App\Feed;
use App\Jobs\FeedProcessProductsFinishedJob;
use App\Jobs\FeedProcessProductsJob;
use App\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class FeedProcessProducts extends Command
{

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'feeds:process {feed?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'processes feed products and filters';


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
        Log::info('Schedule: feed process products');
        $feed = $this->argument('feed');

        if($feed)
            $feeds = Feed::where('id',$feed)->where('active',1)->has('channelmappings')->get();

         if(!$feed)
            $feeds = Feed::where('active',1)->has('channelmappings')->get();

         if(!$feeds)
             $this->info('No feeds!');

        $feeds->each(function($feed){
            $this->info('Scheduling feed '.$feed->id);

            $feed->processing_products = 1;
            $feed->save();
            $this->scheduleSyncJob($feed);
        });

    }

    private function scheduleSyncJob($feed)
    {
        Product::where('store_id',$feed->store_id)->chunk(1000, function ($products) use ($feed){
            $chunk = $products->toArray();
            $product = new Product();
            $productsFromFilter = $product->processProductsArray($chunk, $feed);
            $products = $feed->productProcessor($productsFromFilter);

            dispatch(new FeedProcessProductsJob($feed, $products));
        });

        dispatch(new FeedProcessProductsFinishedJob($feed));
    }
}
