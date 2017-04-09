<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class OrderStatistics extends Model
{
    public $timestamps = false;
    protected $guarded = [];

    public static function add_current_total_revenue_amount($date, $marketplace)
    {

        $startdate = $date->format('Y-m-d');
        $enddate = $date->addDay()->format('Y-m-d');
        $orders = $marketplace->orders()->where('order_date', '>',$startdate)->where('order_date', '<',$enddate)->whereHas('items', function ($query) {
            $query->where('cancelled', 0)->where('cancelrequest', 0);
        })->with('items')->get();
        $amount = $orders->sum(function($order){
            return $order->items()->get()->sum('price');
        });

        $existing = OrderStatistics::where('store_id',$marketplace->store->id)->where('marketplace_id',$marketplace->id)->where('date',$startdate)->first();
        if($existing)
            return $existing->update(['amount' => $amount]);

        return OrderStatistics::create([
            'store_id' => $marketplace->store->id,
            'marketplace_id' => $marketplace->id,
            'date' => $startdate,
            'amount' => $amount,
            'count' => $orders->count()
        ]);
    }

}
