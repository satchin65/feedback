<?php

namespace App\Console;

use Illuminate\Console\Command;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        Commands\ScheduleProductImports::class,
        Commands\ProcessAllMarketplaceProducts::class,
        Commands\importMarketplaceOrders::class,
        Commands\ScheduleOrderToStoreSync::class,
        Commands\ScheduleCheckOrderShipments::class,
        Commands\TouchOrderStatistics::class,
        Commands\MarketplaceProductsToMarketplace::class,
        Commands\GenerateFeeds::class,
        Commands\FeedProcessProducts::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('connection:schedule')->everyFiveMinutes();
        $schedule->command('connection:schedule --run')->everyMinute();

        $schedule->command('marketplace:process')->dailyAt('01:00');
        $schedule->command('marketplace:sync')->dailyAt('02:00');
        $schedule->command('marketplace:ordersync')->everyFiveMinutes();
        $schedule->command('marketplace:checkshipments')->hourly();

        $schedule->command('orders:import')->everyFiveMinutes();
        $schedule->command('statistics:orders')->dailyAt('00:01');
        $schedule->command('feeds:generate')->dailyAt('01:30');
    }

    /**
     * Register the Closure based commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        require base_path('routes/console.php');
    }
}
