<?php

namespace App\Http\Controllers;

use App\Events\UserInvited;
use App\Invite;
use App\Jobs\SendUserInvitation;
use App\Listeners\SendWelcomeEmail;
use App\Mail\WelcomeToFeedstack;
use App\Role;
use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;

class SettingsController extends Controller
{

    public function redirect()
    {
        return redirect('/settings/account');
    }

    public function account()
    {
        $store = currentStore();
        $account = currentAccount();

        return view('settings.account', compact('store','account'));
    }

    public function store()
    {
        $store = currentStore();

        return view('settings.store', compact('store'));
    }

    public function users()
    {
        $store   = currentStore();
        $account = currentAccount();
        $users   = $account->users()->paginate(30);
        $invites = Invite::where('account_id', $account->id)->where('accepted_at',null)->get();

        return view('settings.users', compact('store','account','users','invites'));
    }

    public function profile()
    {
        $user = Auth::user();
        return view('settings.profile', compact('user'));
    }

    public function store_account(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|min:3',
            'address' => 'required|min:3',
            'city' => 'required',
            'zipcode' => 'required',
            'email' => 'required|email',
            'country' => 'required'
        ]);

        $account = currentAccount();
        $account->update($request->except('_token'));
        $account->save();

        flash('Saved', 'Account settings are saved', 'success');
        return back();
    }


    public function store_store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|min:3',
            'url' => 'required|url',
        ]);

        $store = currentStore();
        $store->update($request->except('_token'));
        $store->save();

        flash('Saved', 'Store settings are saved', 'success');
        return back();
    }

    public function store_profile(Request $request)
    {
        $this->validate($request, [
            'firstname' => 'required|min:2',
            'lastname' => 'required|min:2',
            'email' => 'required|email',
        ]);


        $user = Auth::user();
        $user->update($request->except(['_token','password_confirm','password']));
        $user->save();

        if($request->input('password') && $request->input('password_confirm'))
            $user->password = bcrypt($request->input('password'));

        flash('Saved', 'Profile settings are saved', 'success');
        return back();
    }

    public function resendWelcomeEmail()
    {
        $user = Auth::user();
        $user->email_confirm = str_random(16);
        $user->save();

        Mail::to($user->email)->send(new WelcomeToFeedstack($user));

        flash(
            trans('notifications.confirmation resend'),
            trans('notifications.The e-mail confirmation has been resend to your email'),
            'success'
        );
        return back();
    }

    public function confirm_email($confirm_code)
    {
        if(!Auth::user()) {
            Session::put('confirm', $confirm_code);
            return redirect('/login');
        }

        $user = Auth::user();

        return $user->processEmailConfirm($confirm_code);

    }

}
