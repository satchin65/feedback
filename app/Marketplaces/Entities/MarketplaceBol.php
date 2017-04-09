<?php

namespace App\Marketplaces\Entities;

use App\Marketplaces\MarketplaceEntity;
use App\ProcessedProduct;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Wienkit\BolPlazaClient\BolPlazaClient;
use Wienkit\BolPlazaClient\BolPlazaDataParser;
use Wienkit\BolPlazaClient\Entities\BolPlazaOfferCreate;
use Wienkit\BolPlazaClient\Entities\BolPlazaOfferUpdate;
use Wienkit\BolPlazaClient\Entities\BolPlazaShipmentRequest;
use Wienkit\BolPlazaClient\Entities\BolPlazaStockUpdate;
use Wienkit\BolPlazaClient\Entities\BolPlazaTransport;

class MarketplaceBol extends MarketplaceBaseModel implements MarketplaceEntity
{

    public $EntityName = 'Bol';

    public $attributes = [
        'api_key' => 'string',
        'api_secret' => 'string',
    ];

    protected $marketplaceClient;
    protected $api_key;
    protected $api_secret;

    public function connect($marketplace)
    {
        $attributes = json_decode($marketplace->attributes, 1);
        $this->marketplace = $marketplace;
        $this->api_key = $attributes['api_key'];
        $this->api_secret = $attributes['api_secret'];
        $this->marketplaceClient = new BolPlazaClient($this->api_key, $this->api_secret);
        $this->marketplaceClient->setTestMode(false);
    }


    public function getOrders()
    {
        return $this->marketplaceClient->getOrders();
    }


    public function postProducts($products)
    {
        foreach ($products as $product)
        {
                $payload = json_decode($product->payload,true);
                if(! $product->marketplace_reference) {
                    // todo: kan worden verwijderd als recepten up to date is. Aangezien deze feature anders niet meer nodig is.
                    $this->deleteOffer($payload);
                    $status = $this->createOffer($payload);
                    $product->marketplace_reference = $product->reference;
                    $product->status = $status['status'];
                    $product->logs()->create($status);

                }else{
                    $status = $this->updateOffer($product->marketplace_reference, $payload);
                    $product->status = $status['status'];
                    $product->logs()->create($status);

                    $status = $this->updateStockOffer($product->marketplace_reference, $payload);
                    $product->status = $status['status'];
                    $product->logs()->create($status);
                }
                $product->update = 0;
                $product->save();
        }
    }

    public function processProducts($products, $marketplace)
    {

        foreach ($products as $product){
            $processedProduct = ProcessedProduct::where('reference', $product['reference'])->where('marketplace_id',$marketplace->id)->first();
            if($processedProduct){
                $processedProduct->updateProduct($product);
            }else{
                $processedProduct = new ProcessedProduct();
                $processedProduct->createProduct($product,$marketplace);
            }
        }
    }

    public function sendShippedOrder($order, $item)
    {
        Log::info('starting send shipped order '.$order->order_number);

        $firstProduct = $order->items()->where('shipped',1)->first();

        if(!$firstProduct)
            return false;


        $shipment = new BolPlazaShipmentRequest();
        $shipment->OrderItemId = $item->order_item_reference;
        $shipment->ShipmentReference = 'shp_'.$order->order_number.'_'.$item->offer_reference;
        $shipment->DateTime = date('Y-m-d\TH:i:s');
        $shipment->ExpectedDeliveryDate = date('Y-m-d\TH:i:s');
        $transport = new BolPlazaTransport();
        $transport->TransporterCode = str_replace('DPD_NL','DPD-NL',$firstProduct->transportcode);
        $transport->TrackAndTrace = $item->tracktrace;
        $shipment->Transport = $transport;


        $xmlData = BolPlazaDataParser::createXmlFromEntity($shipment);


        Log::info('Prep done. go process shipment'.json_encode($xmlData));

        try {
            Log::info('Send shipment now:'. json_encode($shipment));

            $result = $this->marketplaceClient->processShipment($shipment);
            $order->marketplace_send_at = Carbon::now();
            $order->save();
            Log::info('send shipment done! ', ['id' => json_encode($result->id), 'eventtype' => json_encode($result->eventType),'description' => json_encode($result->description),'status' => json_encode($result->status),'errorMessage' => json_encode($result->errorMessage) ] );

        } catch (\Exception $e) {
            Log::error(' Not processed shipment to bol api '.json_encode($e->getMessage()));
        }

    }

    private function deleteOffer($product)
    {

        try {
            Log::info('Delete offer:'. json_encode($product));
            $this->marketplaceClient->deleteOffer($product['reference']);
        } catch (\Exception $e) {
            Log::error('Error on product delete reference: '.$product['reference'].' marketplace = '.$this->marketplace->id.' - '.$this->marketplace->name.' '.json_encode($e->getMessage()));
        }
    }

    private function createOffer($product)
    {
        try {
            Log::info('create offer' . json_encode($product));
            $offerCreate = new BolPlazaOfferCreate();
            $offerCreate->EAN = $product['ean'];
            $offerCreate->Condition = $product['condition'];
            $offerCreate->Price = $product['price'];
            $offerCreate->DeliveryCode = $product['deliverycode'];
            $offerCreate->QuantityInStock = $product['stock'];
            $offerCreate->Publish = $product['publish'];
            $offerCreate->ReferenceCode = $product['reference'];
            $offerCreate->Description = htmlspecialchars($product['title']);

            $this->marketplaceClient->createOffer($product['reference'], $offerCreate);
            return ['status' => 'success', 'description' => 'created'];

        } catch (\Exception $e) {
            Log::error('Error on product sync  marketplace: '.$product['reference'].' marketplace = '.$this->marketplace->id.' - '.$this->marketplace->name.' '.json_encode($e->getMessage()));
            return ['status' => 'error', 'description' => $e->getMessage()];
        }
    }

    private function updateOffer($reference, $product)
    {
        try {
            Log::info('update offer' . json_encode($product));
            $offerUpdate = new BolPlazaOfferUpdate();
            $offerUpdate->Price = $product['price'];
            $offerUpdate->DeliveryCode = $product['deliverycode'];
            $offerUpdate->Publish = $product['publish'];
            $offerUpdate->ReferenceCode = $product['reference'];
            $offerUpdate->Description = htmlspecialchars($product['title']);
            $this->marketplaceClient->updateOffer($reference, $offerUpdate);
            return ['status' => 'success', 'description' => 'updated'];

        } catch (\Exception $e) {
            Log::error('Error on product update  marketplace: '.$product['reference'].' marketplace = '.$this->marketplace->id.' - '.$this->marketplace->name.' '.json_encode($e->getMessage()));
            return ['status' => 'error', 'description' => $e->getMessage()];

        }

    }

    private function updateStockOffer($reference, $product)
    {
        try {
            Log::info('update stock ' . json_encode($product));
            $stockUpdate = new BolPlazaStockUpdate();
            $stockUpdate->QuantityInStock = $product['stock'];
            $this->marketplaceClient->updateOfferStock($reference, $stockUpdate);
            return ['status' => 'success', 'description' => 'stock updated'];

        } catch (\Exception $e){

            Log::error('Error on product stock update  marketplace: '.$reference.' marketplace = '.$this->marketplace->id.' - '.$this->marketplace->name.' '.json_encode($e->getMessage()));
            return ['status' => 'error', 'description' => $e->getMessage()];
        }
    }
}
