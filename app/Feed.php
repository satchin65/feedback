<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class Feed extends Model
{

    protected $guarded = [];

    public function modifiers()
    {
        return $this->hasMany(Modifier::class);
    }

    public function channelMappings()
    {
        return $this->hasMany(ChannelMapping::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function categoryFilters()
    {
        return $this->hasMany(CategoryFilter::class);
    }

    public function processedProducts()
    {
        return $this->hasMany(ProcessedFeedProduct::class);
    }

    public static function getFeed($id)
    {
        return currentStore()->feeds()->where('id', $id)->first();
    }



    public function getChannelmappings()
    {
        if ($this->channelMappings()->count() == 0) {
            return new ChannelMapping;
        }

        return $this->_ChannalMappingsMappedArray($this->channelmappings()->get());
    }


    private function _ChannalMappingsMappedArray($channelmaps)
    {
        $result = $channelmaps->mapWithKeys(function ($item) {
            return [$item['field'] => [
                'source' => $item['source'],
                'value' => $item['value'],
            ]];
        })->toArray();
        return $result;
    }


    public function productProcessor($products)
    {
        $mapping = $this->getChannelmappings();
        foreach ($products as $product) {
            $productresult[] = $this->processMapping($product, $mapping);
        }
        if(isset($productresult))
            return $productresult;
        return [];
    }


    private function processMapping($product, $mapping)
    {
        foreach ($mapping as $mapname => $mapcontent) {
            if ($mapcontent['source'] == 'custom' && $mapcontent['value']) {
                $result[$mapname] = $mapcontent['value'];
            } else {
                if(isset($product[$mapcontent['source']])){
                        $result[$mapname] = $product[$mapcontent['source']];

                        /* Custom column dus check voor attribute */
                }else{
                    if(isset($product['attributes'])){
                        foreach($product['attributes'] as $attribute)
                        {
                            foreach($attribute as $key => $value)
                            if($key == $mapcontent['source'])
                            {
                                $result[$mapname] = $value;
                            }
                        }
                    }

                }
            }
        }
        return $result;
    }


    public function getProcessableProducts($limit = 0)
    {
        if($limit == 0)
            $products = ProcessedFeedProduct::where('feed_id',$this->id)->pluck('payload');

        if($limit > 0)
            $products = ProcessedFeedProduct::where('feed_id',$this->id)->take($limit)->pluck('payload');

        return $products;
    }


    public function generateFeed($limit = 0)
    {
        $entity = 'App\Feeds\Entities\\'.$this->entity;
        $entityClass = new $entity();

        return $entityClass->generateFeed($this,$limit);
        
    }

    /**
     * Clean processed feed products from the database
     * @param bool $scheduleProcess
     */
    public function cleanProcessedProducts($scheduleProcess = false)
    {

        DB::table('processed_feed_products')->where('feed_id',$this->id)->delete();
        if($scheduleProcess) {
            Artisan::call('feeds:process', [
                'feed' => $this->id
            ]);
        }
    }
}
