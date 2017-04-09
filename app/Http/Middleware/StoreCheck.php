<?php

namespace App\Http\Middleware;

use App\Store;
use Closure;
use Mixpanel;
use Session;
use App\Account;
use Illuminate\Support\Facades\Auth;

class StoreCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect('/login');
        }

        if (!Session::has('account')) {
            return redirect('/accounts');
        }

        if (!Session::has('store')) {
            $account = Account::find(Session::has('account'));

            if (!$account) {
                $account = Auth::user()->accounts()->first();
            }

            if (!$account->stores->count()) {
                return redirect('/stores/create');
            }

            if ($account->stores->count() == 1) {
                session(['store' => $account->stores->first()->id]);
            }

            if ($account->stores->count() > 1) {
                return redirect('/stores');
            }
        }

        $store = Store::find(Session::get('store'));
        view()->share('store', $store);
        $mp = Mixpanel::getInstance(env('MIXPANEL_TOKEN'));
        $mp->register('Store', ['ID' => $store->id, 'Name' => $store->name]);

        return $next($request);
    }
}
