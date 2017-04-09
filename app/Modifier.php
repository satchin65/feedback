<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Modifier extends Model
{
    protected $guarded = [];

    public function marketplace()
    {
        return $this->belongsTo(Marketplace::class);
    }

    public function filters()
    {
        return $this->hasMany(Filter::class);
    }

    public function actions()
    {
        return $this->hasMany(Action::class);
    }

    public function scopeGetNextOrder($query)
    {
        if ($query->count() < 1) {
            return 1;
        }
        return $query->orderBY('order', 'DESC')->first()->order+1;
    }
}
