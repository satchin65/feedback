<?php

namespace App\Jobs;

use App\Connections\xmlParser;
use App\Events\FinishedProductImport;
use App\Notifications\SlackConnectionImportRun;
use App\Product;

use \App\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class processXmlConnection implements ShouldQueue
//class processXmlConnection
{
    use InteractsWithQueue, Queueable, SerializesModels;

    protected $feed_connection;
    public $tries = 5; // max attempts
    public $timeout = 180; // 3 minutes

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($feed_connection)
    {
        $this->feed_connection = $feed_connection;
        $this->feed_connection->scheduled = 1;
        $this->feed_connection->save();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(xmlParser $xmlParser, Product $product)
    {
        event(new FinishedProductImport($this->feed_connection, 'running'));
        // Get xml array
        $results = $xmlParser->_ParseXmlFile($this->feed_connection->feed_url);
        $mappings = $this->feed_connection->mappings()->get()->toArray();
        $colomkeys = Product::getColumnKeys();
        $new_map = '';



        foreach ($mappings as $map) {
            $new_map[$map['source']] = $map['target'];
        }
        $i=0;

        $this->feed_connection->product_count = $i;
        $this->feed_connection->scheduled = 0;
        $this->feed_connection->running = 0;
        $this->feed_connection->failed = 0;
        $this->feed_connection->last_completed_date = Carbon::now();
        $this->feed_connection->save();



        foreach ($results as $xmlProduct) {

            foreach ($new_map as $source => $target) {

                if(isset($target) && isset($source) && isset($xmlProduct[$source])) {
                    if($target == 'sku'){
                        $skus[] = $xmlProduct[$source];
                        $skucol = $source;
                    }
                    if ($target == 'price') {
                        $price = str_replace('EUR', '', $xmlProduct[$source]);
                        $price = str_replace(' ', '', $price);
                        $price = str_replace(',', '', $price);
                        $price = str_replace('-', '', $price);

                        $product_array[$target] = $price;
                    } else {
                        $product_array[$target] = $xmlProduct[$source];
                    }

                }
            }

            $product->processProductData($this->feed_connection, $product_array, $colomkeys);

            $i++;
            unset($product_array);
        }
        $product->processDeletedSkus($this->feed_connection->store_id, $skus);

        // Notify Slack!
        User::where('email','k.veen@microdesign.nl')->first()->notify(new SlackConnectionImportRun($this->feed_connection, $i));

        $this->feed_connection->makeSchedule();
        $this->feed_connection->product_count = $i;
        $this->feed_connection->scheduled = 0;
        $this->feed_connection->running = 0;
        $this->feed_connection->failed = 0;
        $this->feed_connection->last_completed_date = Carbon::now();
        $this->feed_connection->save();
        event(new FinishedProductImport($this->feed_connection, 'finished'));
    }

    public function failed()
    {
        $this->feed_connection->scheduled = 0;
        $this->feed_connection->running = 0;
        $this->feed_connection->failed = 1;
        $this->feed_connection->last_failed_date = Carbon::now();
        $this->feed_connection->save();
        event(new FinishedProductImport($this->feed_connection, 'failed'));
    }


}
