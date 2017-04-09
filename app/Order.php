<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $guarded = [];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function marketplace()
    {
        return $this->belongsTo(Marketplace::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function customer()
    {
        return $this->hasOne(Customer::class);
    }

    public function errors()
    {
        return $this->hasMany(SyncError::class);
    }

    public function processOrder($order)
    {

    }


    public function getStatus()
    {
        $orderItems     = $this->items()->get();
        $cancelrequests = $orderItems->filter(function($order){ if($order->cancelrequest) return true; });
        $cancelled      = $orderItems->filter(function($order){ if($order->cancelled) return true; });
        $unshipped      = $orderItems->filter(function($order){ if(! $order->shipped) return true; });
        $shipped        = $orderItems->filter(function($order){ if($order->shipped) return true; });


        if(count($unshipped) && !count($cancelled) && !count($cancelrequests))
            return 'Open';

        if(! count($unshipped))
            return 'Completed';

        if(count($cancelrequests) && count($unshipped))
            return 'Customer cancelled';

        // shipped
        // cancelled
        // cancelrequest
    }

    public function getStatusLabel()
    {
        $status = str_replace(' ','_',$this->getStatus());
        $status = strtolower($status);

        if($status == 'open')
            return 'label_warning';

        if($status == 'completed')
            return 'success';

        if($status == 'customer_cancelled' || $status == 'cancelled')
            return 'label_error';
    }
    public function getProductsTotal()
    {
        $orderItems = $this->items()->get();
        return $orderItems->sum('qty');
    }

    public function getOrderTotal()
    {
        $orderItems = $this->items()->get();

        return '&euro; '.
            number_format(
                $orderItems->reduce(function($total, $order){
                    return $order->qty * $order->price;
                })
            ,2);
    }
}
