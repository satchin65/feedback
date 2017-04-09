<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProcessedProductLog extends Model
{
    protected $guarded = [];

    public function processedproduct()
    {
        return $this->belongsTo(ProcessedProduct::class);
    }
}
