<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class ProductStatistics extends Model
{
    public $timestamps = false;
    protected $guarded = [];

    public static function add_current_marketplace_product_count($count, $marketplace)
    {
            $existing = ProductStatistics::where('store_id',$marketplace->store->id)->where('marketplace_id',$marketplace->id)->where('date',Carbon::now()->format('Y-m-d'))->first();
            if($existing)
                return $existing->update(['amount' => $count]);

            return ProductStatistics::create([
                'store_id' => $marketplace->store->id,
                'marketplace_id' => $marketplace->id,
                'date' => Carbon::now(),
                'amount' => $count
            ]);
    }

}
