<?php

namespace App\Http\Controllers;

use App\Account;
use App\Events\UserInvited;
use App\Invite;
use App\Role;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InviteController extends Controller
{

    public function join($account, $code)
    {
        $account = Account::find($account);
        $invite = Invite::where('code',$code)->where('accepted_at', null)->where('account_id', $account->id)->first();

        if(!$account || !$invite){
            flash(
                trans('notifications.Invite not found!'),
                trans('notifications.The invite has not been found, contact support@feedstack.io for more information.'),
                'error'
            );
            return redirect('/login');
        }

        $users = User::where('email', $invite->email)->count();
        if($users > 0){
            flash(
                trans('notifications.Error found!'),
                trans('notifications.The invite has either already been used or user already exist. For more information contact support@feedstack.io'),
                'error'
            );
            return redirect('/login');
        }

        $user = User::create([
            'firstname' => $invite->firstname,
            'lastname' => $invite->lastname,
            'email' => $invite->email,
            'password' => str_random(8),
            'email_confirm' => 1
        ]);

        $invite->accepted_at = Carbon::now();
        $invite->save();

        $user->_assignAccount($account, $invite->role_id);
        Auth::login($user);
        flash(
            trans('notifications.Welcome to FeedStack'),
            trans('notifications.Do not forget to choose your own password!'),
            'success'
        );
        return redirect('/settings/profile');
    }

    public function usersInvite(Request $request)
    {
        $this->validate($request, [
            'firstname' => 'required|min:2',
            'lastname' => 'required|min:2',
            'email' => 'required|email',
        ]);

        if(!$role = $this->_getRole($request->input('role')))
            return back();

        if($errors = $this->_verifySubmit($request))
            return back();

        $invite = Invite::create([
            'firstname' => $request->input('firstname'),
            'lastname' => $request->input('lastname'),
            'email' => $request->input('email'),
            'code' => str_random(16),
            'role_id' => $role->id,
            'account_id' => currentAccount()->id,
        ]);

        event(new UserInvited(Auth::user(), $invite));

        flash(
            trans('notifications.Invite send'),
            trans('notifications.The invite has successfully been send and awaiting reply'),
            'success'
        );
        return back();

    }

    private function _getRole($input)
    {
        $role = Role::find($input);

        if(!$role){
            flash(
                trans('notifications.Something went wrong'),
                trans('notifications.Please contact support at support@feedstack.io'),
                'error'
            );
            return false;
        }
        return $role;
    }

    private function _verifySubmit($request)
    {
        $users = User::where('email',$request->input('email'))->count();
        $invite = Invite::where('email',$request->input('email'))->count();

        if($users == 0 && $invite == 0)
            return false;

        flash(
            trans('notifications.E-mail already exists'),
            trans('notifications.Please use a unique email or contact our support at support@feedstack.io'),
            'error'
        );
        return 'error';
    }

}
