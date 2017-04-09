<?php

namespace App\Connectors;

use App\Jobs\ProcessShippedOrder;
use App\Order;
use App\Store;
use Carbon\Carbon;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Log;

class MagentoOrderProcessor implements StoreProvider
{


    public function getOrder(Order $order)
    {
        $client = new Client(['http_errors' => false]);
        $res = $client->request('POST', $order->store->url.'/fsconnect/orders/get',[
            'form_params' => [
                'api_key' => $order->store->api_key,
                'order_id' => $order->order_number
            ]
        ]);

        return json_decode($res->getBody());

        if($res->getStatusCode() != 200)
            return false;

        return json_decode($res->getBody());
    }

    /**
     * @param $customer
     * @param $orderdata
     * @return mixed
     */
    public function postOrder(Order $order)
    {
        if($order->store_order_id)
            return 'already synced';

        $magento_order['order_id'] = $order->order_number;
        $magento_order['shipping_address'] = $this->_mapCustomerKeys($order->customer);
        $magento_order['items'] = $this->_mapItemsKeys($order->items);

        Log::info('order push: start.', ['order' => $order->id, 'store' => $order->store->name, 'marketplace' => $order->marketplace->name]);

        $postUrl = $order->store->url.'/fsconnect/orders/create';
        $client = new Client(['http_errors' => false]);
        $res = $client->request('POST', $postUrl,[
            'form_params' => [
                'api_key' => $order->store->api_key,
                'store_id' => 1,
                'data' => $magento_order
            ]
        ]);

        if($res->getStatusCode() != 200) {
            Log::info('order push: status code failed.', ['order' => $order->id, 'posturl' => $postUrl, 'error' => json_encode($res->getBody())]);
            return ['error' => 'Was not able to post to store'];
        }

        $result = json_decode($res->getBody());

        if(isset($result->error)){
            $order->errors()->create([
                'error' => $result->error
            ]);
            Log::info('order push: error.', ['order' => $order->id, 'posturl' => $postUrl]);
            return $result;
        }



        $order->store_order_id = $result->increment_id;
        $order->save();
        Log::info('order push: success.', ['order' => $order->id, 'store_order_id' => $result->increment_id]);
        return 'Successfully synced order';

    }


    public function checkForShippedOrder(Order $order)
    {
        if(!$order->store_order_id)
            Log::info('Not synced yet.', ['order' => $order->id]);

        $postUrl = $order->store->url.'/fsconnect/orders/shipment';
        $client = new Client(['http_errors' => false]);
        $postData = [
            'api_key' => $order->store->api_key,
            'store_id' => 1,
            'order_id' => $order->store_order_id
        ];

        Log::info('prep post data.', ['postdata' => json_encode($postData)]);

        $res = $client->request('POST', $postUrl,[
            'form_params' => $postData
        ]);

        if($res->getStatusCode() != 200) {
            Log::info('Get order shipping info failed on status code.', ['order' => $order->id, 'store_order_id' => $order->store_order_id, 'url' => $postUrl,'error' => json_encode($res->getBody())]);
            return ['error' => 'Was not able to post to store'];
        }

        $result = json_decode($res->getBody());

        if(isset($result->error)){
            $order->errors()->create([
                'error' => $result->error
            ]);
            Log::info('error get shipment info.', ['order' => $order->id, 'store_order_id' => $order->store_order_id, 'posturl' => $postUrl, 'postData' => json_encode($postData)]);
            return $result;
        }


        if(!$result->carrier || !$result->tracking){
            $order->errors()->create([
                'error' => 'No carrier or tracking info received'
            ]);
            Log::info('No carrier or tracking info received ', ['order' => $order->id, 'store_order_id' => $order->store_order_id, 'posturl' => $postUrl]);
            return $result;
        }

        foreach($order->items()->get() as $product)
        {
            $product->transportcode = $result->carrier;
            $product->tracktrace = $result->tracking;
            $product->shipment_date = Carbon::now();
            $product->expected_delivery = Carbon::now()->addWeekday();
            $product->shipped = 1;
            $product->save();

            Log::info('Product '.$product->offer_reference.' shipped with: '.$result->carrier.' Track trace: '.$result->tracking);
        }

        dispatch(new ProcessShippedOrder($order->marketplace, $order));

    }



    private function _mapCustomerKeys($customer)
    {

        $street[] = $customer->address;
        $street[] = $customer->housenumber.' '.$customer->housenumber2;
        $street[] = $customer->address_note;

        return [
            'firstname' => (string)$customer->firstname,
            'lastname' => (string)$customer->lastname,
            'company' => (string)$customer->company,
            'street' => $street,
            'postcode' => (string)$customer->zipcode,
            'city' => (string)$customer->city,
            'country_id' => (string)$customer->country,
            'telephone' => (string)$customer->phone,
            'email' => (string)$customer->email,
        ];
    }

    private function _mapItemsKeys($items)
    {
        foreach ($items as $item)
        {
            $result[] = [
                'sku'	=> $item->offer_reference,
                'qty_ordered' => (string)$item->qty,
                'price'	=> (string)$item->price
            ];
        }
        if(isset($result))
            return $result;
        return false;
    }

}