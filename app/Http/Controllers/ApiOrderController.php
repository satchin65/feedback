<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessShippedOrder;
use App\Store;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Log;

class ApiOrderController extends Controller
{

    public function sendShipment(Request $request)
    {
        $data = $request->all();

        $store = Store::where('api_key', $data['api_key'])->first();
        if(! $store)
            return $this->noStoreException($data['api_key']);

        $order = $store->orders()->where('store_order_id', $data['order'])->first();
        if(! $order)
            return $this->noOrderException($data['order']);

        foreach($data['products'] as $product)
        {
            $orderItem = $order->items()->where('offer_reference', $product)->first();
            if( ! $orderItem)
                return $this->productNotFoundException($order, $product, $store);

            $orderItem->transportcode = $data['shipping']['carrier'];
            $orderItem->tracktrace = $data['shipping']['tracktrace'];
            $orderItem->shipment_date = Carbon::now();
            $orderItem->expected_delivery = Carbon::now()->addWeekday();
            $orderItem->shipped = 1;
            $orderItem->save();

            Log::info('Product '.$product.' shipped with: '.$data['shipping']['carrier'].' Track trace: '.$data['shipping']['tracktrace']);
        }

        dispatch(new ProcessShippedOrder($order->marketplace, $order));

        return 'Done!';

    }

    private function noOrderException($order)
    {
        Log::info('Order not found '.$order);
    }

    private function noStoreException($api_key)
    {
        Log::info('Store not found with api key: '.$api_key);
    }

    private function productNotFoundException($order, $product, $store)
    {
        Log::info('Product not found on order '.$order->id.' sku '.$product.' storeid '.$store->id);
    }


}
