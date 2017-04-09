<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
    protected $guarded = [];

    protected static $actions = ['set','exclude','calculate_add'];

    public static function getAvailableActions()
    {
        return self::$actions;
    }
}
