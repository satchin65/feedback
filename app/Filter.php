<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Filter extends Model
{
    protected $guarded = [];

    protected static $filters = ['contains','not_contains','greater_then','lower_then','equal'];

    public static function getAvailableFilterMethods()
    {
        return self::$filters;
    }
}
