<?php

namespace App\Console\Commands;

use App\Connection;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Log;

class ScheduleProductImports extends Command
{



    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'connection:schedule
                                {--run : Run scheduled imports}\';';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Schedule product import via configured connections';

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
        if($this->option('run'))
            return $this->run_scheduled_imports();

        $connections = Connection::has('mappings')->where('scheduled',0)->where('running',0)->where('scheduled_at',NULL)->get();
        Log::info('Schedule: product import');
        $connections->each(function($connection){
           $connection->makeSchedule();
        });
    }

    private function run_scheduled_imports()
    {

        $connections = Connection::has('mappings')->where('scheduled',0)->where('running',0)->where('scheduled_at','<',Carbon::now())->get();
        $connections->each(function($connection){
            $connection->startImport();
        });
        return true;
    }

}
