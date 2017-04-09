<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProcessedFeedProduct extends Model
{
    public $timestamps = false;
    protected $guarded = [];

    public function feed()
    {
        return $this->belongsTo(Feed::class);
    }

    public function logs()
    {
        return $this->hasMany(ProcessedFeedProduct::class);
    }

    public function updateProduct($payload, $reference)
    {
        // Early return when product is the same
        if(count(array_diff_assoc($payload, json_decode($this->payload,true))) == 0)
            return $this;

        $this->reference      = $reference;
        $this->payload        = json_encode($payload);
        $this->update         = 1;
        $this->save();
        return $this;
    }


    public function createProduct($payload, $reference, $feed)
    {

        $this->feed_id        = $feed->id;
        $this->reference      = $reference;
        $this->payload        = json_encode($payload);
        $this->update         = 1;
        $this->save();

        return $this;
    }
}
