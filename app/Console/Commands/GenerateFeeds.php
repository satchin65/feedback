<?php

namespace App\Console\Commands;

use App\Feed;
use App\Jobs\GenerateFeed;
use Illuminate\Console\Command;

class GenerateFeeds extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'feeds:generate {feed?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'refresh all active feeds';


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
        $feed = $this->argument('feed');
        if(!$feed)
            $feeds = feed::where('active',1)->has('channelmappings')->get();
        if($feed)
            $feeds = feed::where('id',$feed)->where('active',1)->has('channelmappings')->get();

        $feeds->each(function($feed){
            $feed->processing_feed = 1;
            $this->scheduleGenerateFeed($feed);
        });

    }

    private function scheduleGenerateFeed($feed)
    {

        dispatch(new generateFeed($feed));

    }
}
