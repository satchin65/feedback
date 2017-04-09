<?php

namespace App\Http\Controllers\Settings;

use App\Channelmapping\ChannelMapper;
use App\Plan;
use App\Product;
use Illuminate\Http\Request;
use App\Feed;
use App\Http\Controllers\Controller;

class FinanceController extends Controller
{


    public function index()
    {
        $account = currentAccount();
        $invoices = $account->invoices()->get();

        return view('settings.finance', compact('account','invoices'));
    }

    public function create(Request $request)
    {
        $account = currentAccount();

        if($account->hasActiveSubscription())
            return 'You already have a subscription, should upgrade';

        $plan = Plan::where('name', $request->input('plan'))->first();
        return $account->subscribeToPlan($plan);

    }

}
