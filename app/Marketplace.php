<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Marketplace extends Model
{

    protected $fillable = ['name','entity','identifier'];

    public function channelmappings()
    {
        return $this->hasMany(ChannelMapping::class);
    }

    public function modifiers()
    {
        return $this->hasMany(Modifier::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function processedProducts()
    {
        return $this->hasMany(ProcessedProduct::class);
    }

    public function categoryFilters()
    {
        return $this->hasMany(CategoryFilter::class);
    }


    public static function GetMarketplace($id)
    {
        return currentStore()->marketplaces()->where('id', $id)->first();
    }

    public function getChannelmappings()
    {
        if ($this->channelmappings()->count() == 0) {
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
        $result['reference'] = $product[$this->identifier];
        foreach ($mapping as $mapname => $mapcontent) {
            if ($mapcontent['value']) {
                $result[$mapname] = $mapcontent['value'];
            } else {
                $result[$mapname] = $product[$mapcontent['source']];
            }
        }
        return $result;
    }


    public function getProcessableProducts()
    {
        $productsFromFilter = Product::where('store_id',$this->store_id)->ProcessMarketplaceFilters($this);
        $products = $this->productProcessor($productsFromFilter);

        ProductStatistics::add_current_marketplace_product_count(count($products), $this);

        return $products;
    }

    public function getToBeUpdatedProducts()
    {
        $products = $this->processedProducts()->where('update',1)->get();
        return $products;
    }

}
