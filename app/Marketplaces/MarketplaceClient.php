<?php

namespace App\Marketplaces;

use App\Jobs\ProcessMarketplaceEntityProducts;
use App\Marketplace;
use App\Notifications\SlackNewBolOrderReceived;
use App\Order;
use App\OrderStatistics;
use App\Product;
use App\User;
use Carbon\Carbon;

class MarketplaceClient
{
    protected $marketplaceEnitity;
    protected $marketplace;

    public function __construct(MarketplaceEntity $marketplaceEnitity, Marketplace $marketplace)
    {

        $this->marketplaceEnitity = $marketplaceEnitity;
        $this->marketplace = $marketplace;

        // Connects to the api and gets the needed keys and such
        $this->marketplaceEnitity->connect($this->marketplace);
    }

    public function postProducts($products)
    {
        $this->marketplaceEnitity->postProducts($products);
    }

    public function processProducts($products)
    {
        $this->marketplaceEnitity->processProducts($products, $this->marketplace);
    }

    public function importOpenOrders()
    {
        $orders = collect($this->marketplaceEnitity->getOrders());

        $orders->each(function($order){

            $orderExist = Order::where('store_id',$this->marketplace->store_id)->where('order_number',$order->OrderId)->first();

            if(!$orderExist)
                return $this->createNewOrder($order);

            return $this->updateExistingOrder($order);


        });
    }


    public function sendShippedOrder($order, $item)
    {
        $this->marketplaceEnitity->sendShippedOrder($order, $item);
    }

    private function createNewOrder($order)
    {
        $orderItems = $this->formatOrderItems($order->OrderItems);
        $customer = $this->formatCustomer($order->CustomerDetails->ShipmentDetails);

        $newOrder = Order::create([
            'store_id' => $this->marketplace->store_id,
            'marketplace_id' => $this->marketplace->id,
            'order_number' => $order->OrderId,
            'order_date' => Carbon::parse($order->DateTimeCustomer)
        ]);

        $orderItems->each(function($orderItem) use ($newOrder){
            $newOrder->items()->create($orderItem);
        });
        $newOrder->customer()->create($customer);

        OrderStatistics::add_current_total_revenue_amount(Carbon::parse($order->DateTimeCustomer), $this->marketplace);

        User::where('email','k.veen@microdesign.nl')->first()->notify(new SlackNewBolOrderReceived($newOrder));
    }


    private function updateExistingOrder($order)
    {
        // todo create update order function
        return true;
    }


    private function formatOrderItems($orderItems)
    {
        return collect($orderItems)->map(function($orderItem){

            /*+"OrderItemId": "123"
            +"EAN": "9789062387410"
            +"OfferReference": "PARTNERREF001"
            +"Title": "Harry Potter"
            +"Quantity": "2"
            +"OfferPrice": "123.45"
            +"TransactionFee": "1.50"
            +"PromisedDeliveryDate": "2017-02-08+01:00"
            +"OfferCondition": "AS_NEW"
            +"CancelRequest": "false"*/
            $cancel = 0;
            if($orderItem->CancelRequest)
                $cancel = 1;

            return [
                'order_item_reference' => $orderItem->OrderItemId,
                'ean' => $orderItem->EAN,
                'offer_reference' => $orderItem->OfferReference,
                'title' => $orderItem->Title,
                'qty' => $orderItem->Quantity,
                'price' => $orderItem->OfferPrice,
                'fee' => $orderItem->TransactionFee,
                'promised_delivery' => $orderItem->PromisedDeliveryDate,
                'condition' => $orderItem->OfferCondition,
                'cancelrequest' => false,
            ];
        });
    }

    private function formatCustomer($ShipmentDetails)
    {


        return [
            'store_id' => $this->marketplace->store_id,
            'type' => 'shipping',
            'gender' => $ShipmentDetails->SalutationCode,
            'firstname' => $ShipmentDetails->Firstname,
            'lastname' => $ShipmentDetails->Surname,
            'address' => $ShipmentDetails->Streetname,
            'address2' => $ShipmentDetails->AddressSupplement,
            'housenumber' => $ShipmentDetails->Housenumber,
            'housenumber2' => $ShipmentDetails->HousenumberExtended,
            'address_note' => $ShipmentDetails->ExtraAddressInformation,
            'zipcode' => $ShipmentDetails->ZipCode,
            'city' => $ShipmentDetails->City,
            'country' => $ShipmentDetails->CountryCode,
            'email' => $ShipmentDetails->Email,
            'phone' => $ShipmentDetails->DeliveryPhoneNumber,
            'company' => $ShipmentDetails->Company,
            'tax' => $ShipmentDetails->VatNumber
        ];

           /*  +"SalutationCode": "01"
              +"Firstname": "Jan"
              +"Surname": "Janssen"
              +"Streetname": "Shipmentstraat"
              +"Housenumber": "42"
              +"HousenumberExtended": "bis"
              +"AddressSupplement": "3 hoog achter"
              +"ExtraAddressInformation": "extra adres info"
              +"ZipCode": "1000 AA"
              +"City": "Amsterdam"
              +"CountryCode": "NL"
              +"Email": "nospam4me@myaccount.com"
              +"DeliveryPhoneNumber": "0201234567"
              +"Company": "The Company"
              +"VatNumber": null*/

    }



}
