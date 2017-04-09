<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Users\AccountsTrait;
use App\Users\RolesTrait;
use Illuminate\Support\Facades\Session;

class User extends Authenticatable
{
    use Notifiable, AccountsTrait, RolesTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname','lastname','company','phone', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token','phone'
    ];


    public function name()
    {
        return $this->firstname . ' ' . $this->lastname;
    }

    public function routeNotificationForSlack()
    {
        return getenv('SLACK_NOTIFICATION_URL') ?: 'https://hooks.slack.com/services/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'; // else live
    }

    public function processEmailConfirm($confirm_code)
    {
        if($this->email_confirm != $confirm_code){
            flash(
                trans('notifications.E-mail confirmation failed!'),
                trans('notifications.The identification code is invalid, please resend the code from your settings'),
                'error');
            return redirect('/settings/profile');
        }

        $this->email_confirm = 1;
        $this->save();
        Session::forget('confirm');

        flash(
            trans('notifications.Email confirmed'),
            trans('notifications.E-mail has been successfully confirmed'),
            'success');
        return redirect('/');

    }


    public function getAvatar()
    {
        return "http://www.gravatar.com/avatar/".md5($this->email)."?s=100";
    }
}
