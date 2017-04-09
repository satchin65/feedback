<?php

namespace App\Connectors;

/**
 * Interface StoreProvider
 * @package app\Connectors
 */
interface StoreProvider
{

    /**
     * @param \App\Order $order
     * @return mixed
     */
    public function getOrder(\App\Order $order);

    /**
     * @param \App\Order $order
     * @return mixed
     */
    public function postOrder(\App\Order $order);

    /**
     * @param \App\Order $order
     * @return mixed
     */
    public function checkForShippedOrder(\App\Order $order);

}