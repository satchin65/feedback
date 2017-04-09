<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OrdersController extends Controller
{

    public function index()
    {
        $orders = currentStore()->orders()->orderBy('order_date','DESC')->paginate(40);

        return view('orders.index', compact('orders'));
    }
}
