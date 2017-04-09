<?php

namespace App\Connectors;


class Magento2OrderProcessor implements StoreProvider
{

    /**
     * @param $order_id
     * @return mixed
     */
    public function getOrder($order_id)
    {

    }

    /**
     * @param $customer
     * @param $orderdata
     * @return mixed
     */
    public function postOrder($customer, $orderdata)
    {
        return 'Succesfully posted Magento2 order';
    }
}