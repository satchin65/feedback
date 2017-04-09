<?php

namespace App\Connectors;

use App\Order;

class OrderProcessor implements StoreProvider
{

    public $provider;

    public function __construct(StoreProvider $StoreProvider)
    {
        $this->provider = $StoreProvider;
    }

    /**
     * @param $order_id
     * @return mixed
     */
    public function getOrder(Order $order)
    {
        return $this->provider->getOrder($order);
    }

    /**
     * @param $customer
     * @param $orderdata
     * @return mixed
     */
    public function postOrder(Order $order)
    {
        return $this->provider->postOrder($order);
    }

    /**
     * @param Order $order
     * @return mixed
     */
    public function checkForShippedOrder(Order $order)
    {
        return $this->provider->checkForShippedOrder($order);
    }
}