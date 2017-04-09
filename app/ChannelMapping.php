<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChannelMapping extends Model
{

    public function marketplace()
    {
        return $this->belongsTo(Marketplace::class);
    }
}
