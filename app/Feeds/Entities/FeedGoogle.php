<?php

namespace App\Feeds\Entities;

use App\ProcessedFeedProduct;
use App\ProcessedProduct;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class FeedGoogle
{

    public $EntityName = 'Google';

    public $attributes = [];

    protected $marketplaceClient;
    protected $api_key;
    protected $api_secret;


    public function processProducts($feed, $products)
    {

        foreach ($products as $product){

            $processedProduct = ProcessedFeedProduct::where('reference', $product['id'])->where('feed_id',$feed->id)->first();

            if($processedProduct){
                $processedProduct->updateProduct($product, $product['id']);
            }else{
                dd($product);
                $processedProduct = new ProcessedFeedProduct();
                $processedProduct->createProduct($product, $product['id'],$feed);
            }
        }
    }


    public function generateFeed($feed, $limit)
    {
        $dom = new \DOMDocument('1.0', 'utf-8');

        $rss = $dom->appendChild($dom->createElement('rss'));
        $xmlnsg = $dom->createAttribute('xmlns:g');
            $xmlnsg->value = 'http://base.google.com/ns/1.0';
        $xmlnsc = $dom->createAttribute('xmlns:c');
            $xmlnsc->value = 'http://base.google.com/cns/1.0';
        $version = $dom->createAttribute('version');
            $version->value = '2.0';
        $rss->appendChild($xmlnsg);
        $rss->appendChild($xmlnsc);
        $rss->appendChild($version);


        $newFeed = $rss->appendChild(
            $dom->createElement('channel')
        );



        $title = $dom->createElement('title','Google_Shopping');
            $newFeed->appendChild($title);
        $description = $dom->createElement('description','Google Shopping');
            $newFeed->appendChild($description);
        $link = $dom->createElement('link',env('APP_URL').'/files/'.currentStore()->folder_hash.'/'.$feed->unique_filename.'.xml');
            $newFeed->appendChild($link);
        $date = $dom->createElement('pubDate',Carbon::now());
            $newFeed->appendChild($date);

        if($limit == 0){
            Storage::put('files/'.$feed->unique_filename.'.xml', $this->generateXML($dom, $newFeed, 0, $feed));
            $feed->processing_feed = 0;
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
            $shippingset=0;
            foreach ($product as $key => $value)
            {
                $key = 'g:'.$key;
                if(preg_match('/shipping_/',$key))
                {

                    if($shippingset == 0){
                        $shipping = $dom->createElement('g:shipping');
                        $item->appendChild($shipping);
                    }
                    $shippingset = 1;

                    $keyitem = str_replace('shipping_','',$key);

                    $shipping->appendChild($dom->createElement($keyitem,trim(htmlspecialchars($value))));
                }else{
                    $item->appendChild(
                        $dom->createElement($key,trim(htmlspecialchars($value)))
                    );
                }


            }

        }
        $dom->preserveWhiteSpace = false;
        $dom->formatOutput = true;
        return $dom->saveXML();
    }
}
