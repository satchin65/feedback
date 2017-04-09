<?php

namespace App\Http\Controllers;

use App\Events\NewAccountCreated;
use App\Notifications\SlackConnectionImportRun;
use App\Product;
use Auth;
use Bugsnag\BugsnagLaravel\Facades\Bugsnag;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        /*$product = Product::find('8109');
        $product->attributes = ['test1' => 'aa','test2' => 'bb'];
        $product->save();
        dd($product);*/

        $account = currentAccount();


        $store = currentStore();
        $productCount = currentStore()->products()->count();
        $channels = currentStore()->marketplaces()->count();
        $orders = currentStore()->orders()->where('created_at', '>', Carbon::now()->format('Y-m-d'))->get();
        $total_revenue_today = $orders->sum(function($order){
           return $order->items()->pluck('price')->sum();
        });
        $total_revenue_today = number_format($total_revenue_today,2);

        return view('dashboard', compact('account', 'store', 'productCount','channels','total_revenue_today'));
    }
}
