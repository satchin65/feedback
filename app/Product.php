<?php

namespace App;

use App\Product\ProductFilterTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class Product extends Model
{
    use ProductFilterTrait;

    protected $guarded = [];

    protected $casts = [
        'attributes' => 'json'
    ];


    public function scopeFromStore($query)
    {
        return $query->where('store_id', currentStore()->id);
    }

    public function processProductData($connection, $data, $colomkeys)
    {

        if (!isset($data['sku']) || empty($data['sku'])) {
            return 'error';
        }

        $product = Product::where('sku', $data['sku']);

        if ($product->count()) {
            return $this->_updateProductData($product->first(), $data, $connection, $colomkeys);
        }

        return $this->_addNewProduct($data, $connection, $colomkeys);
    }

    private function _updateProductData($product, $data, $connection, $colomkeys)
    {

        foreach($data as $key => $value)
        {
            // if not basic columns unset + set to new value
            if(!in_array($key,$colomkeys))
            {
                $attributes[] = [$key => $value];
                unset($data[$key]);
            }
        }

        $data['attributes'] = $attributes;

        $product->connection_id = $connection->id;
        $product->store_id = $connection->store_id;
        $product->update($data);
        return true;
    }

    private function _addNewProduct($data, $connection, $colomkeys)
    {
        foreach($data as $key => $value)
        {
            // if not basic columns unset + set to new value
            if(!in_array($key,$colomkeys))
            {
                $attributes[] = [$key => $value];
                unset($data[$key]);
            }
        }

        $data['attributes'] = $attributes;

        $data = array_add($data, 'store_id', $connection->store_id);
        $data = array_add($data, 'connection_id', $connection->id);
        $product = Product::create($data);
        return true;
    }

    public static function getColumnKeys($withId = false)
    {
        // Get basic product column keys for mapping setup
        $basic_columns = Schema::getColumnListing('products');
        $basic_columns[] = 'category';
        $exceptions = ['created_at','updated_at','is_parent','store_id','connection_id'];
        if (!$withId) {
            $exceptions[] = 'id';
        }
        $columns = array_diff($basic_columns, $exceptions);

        return $columns;
    }

    public static function getCustomColumnKeys()
    {
        $store = currentStore();
        $connections = $store->connections()->get();
        $fields = [];
        foreach ($connections as $connection)
        {
            foreach($connection->mappings()->where('custom',1)->pluck('target') as $field)
            {
                $fields[] = $field;
            }
        }

        return $fields;
    }

    /**
     * @param $withId [boolean]
     * @return array
     */
    public static function getAllColumnKeys($withId){
        $productColumns = Product::getColumnKeys($withId);
        $productCustomColumns = Product::getCustomColumnKeys();
        return array_merge($productColumns,$productCustomColumns);
    }

    public function processDeletedSkus($storeid, $skus)
    {
        $store = Store::find($storeid);
        $products = $store->products->pluck('sku')->all();
        $difference = array_diff($products, $skus);

        foreach($difference as $sku)
        {
            Product::where('sku',$sku)->delete();
        }

    }
}
