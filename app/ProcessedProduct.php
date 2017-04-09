<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProcessedProduct extends Model
{

    public $timestamps = false;
    protected $guarded = [];

    public function marketplace()
    {
        return $this->belongsTo(Marketplace::class);
    }

    public function logs()
    {
        return $this->hasMany(ProcessedProductLog::class);
    }

    public function updateProduct($payload)
    {
        // Early return when product is the same
        if(count(array_diff_assoc($payload, json_decode($this->payload,true))) == 0)
            return $this;

        $this->reference      = $payload['reference'];
        $this->price          = $payload['price'];
        $this->price_original = $payload['price'];
        $this->stock          = $payload['stock'];
        $this->payload        = json_encode($payload);
        $this->update         = 1;
        $this->save();
        return $this;
    }


    public function createProduct($payload, $marketplace)
    {

        $this->marketplace_id = $marketplace->id;
        $this->reference      = $payload['reference'];
        $this->price          = $payload['price'];
        $this->price_original = $payload['price'];
        $this->stock          = $payload['stock'];
        $this->payload        = json_encode($payload);
        $this->update         = 1;
        $this->save();

        return $this;
    }

}
