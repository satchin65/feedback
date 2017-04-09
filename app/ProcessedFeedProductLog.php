<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProcessedFeedProductLog extends Model
{
    protected $guarded = [];

    public function processedFeedProduct()
    {
        return $this->belongsTo(ProcessedFeedProduct::class);
    }
}
