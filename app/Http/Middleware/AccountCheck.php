<?php

namespace App\Http\Middleware;

use App\Account;
use Closure;
use Mixpanel;
use Session;
use Illuminate\Support\Facades\Auth;

class AccountCheck
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
            if (!$user->accounts->count()) {
                return redirect('/create-account');
            }

            if ($user->accounts->count() == 1) {
                session(['account' => $user->accounts->first()->id]);
            }

            if ($user->accounts->count() > 1) {
                    return redirect('/choose-account');
            }
        }

        $account = Account::find(Session::get('account'));
        view()->share('account', $account);

        $mp = Mixpanel::getInstance(env('MIXPANEL_TOKEN'));
        $mp->identify($user->id); // track an event
        $mp->register('Account', ['ID' => $account->id, 'Name' => $account->name]);

        if(Session::has('confirm'))
            $user->processEmailConfirm(Session::get('confirm'));

        return $next($request);
    }




}
