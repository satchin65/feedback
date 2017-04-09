<?php

namespace App\Feeds\Entities;

use App\ProcessedFeedProduct;
use App\ProcessedProduct;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class FeedBeslist
{

    public $EntityName = 'Beslist';

    public $attributes = [];

    protected $marketplaceClient;
    protected $api_key;
    protected $api_secret;

    public function processProducts($feed, $products)
    {

        foreach ($products as $product){

            $processedProduct = ProcessedFeedProduct::where('reference', $product['winkelproductcode'])->where('feed_id',$feed->id)->first();

            if($processedProduct){
                $processedProduct->updateProduct($product, $product['winkelproductcode']);
            }else{
                $processedProduct = new ProcessedFeedProduct();
                $processedProduct->createProduct($product, $product['winkelproductcode'],$feed);
            }
        }
    }

    public function generateFeed($feed, $limit)
    {


        $dom = new \DOMDocument('1.0', 'utf-8');

        $newFeed = $dom->appendChild(
            $dom->createElement('feed')
        );

        if($limit == 0){
            Storage::put('files/'.currentStore()->folder_hash.'/'.$feed->unique_filename.'.xml', $this->generateXML($dom, $newFeed, 0, $feed));
        }else{
            return $this->generateXML($dom, $newFeed, $limit, $feed);
        }

    }


    private function generateXML($dom ,$newFeed, $limit = 0, $feed)
    {
        if($limit>0){
            $products = $feed->getProcessableProducts($limit);
        }else{
            $products = $feed->getProcessableProducts();
        }

        foreach($products as $product)
        {

            $product = json_decode($product);
            $item = $dom->createElement('item');
            $newFeed->appendChild($item);

            foreach ($product as $key => $value)
            {
                $item->appendChild(
                    $dom->createElement($key,trim(htmlspecialchars($value)))
                );
            }
        }
        $dom->preserveWhiteSpace = false;
        $dom->formatOutput = true;
        return $dom->saveXML();
    }
}
