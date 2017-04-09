<?php

namespace App;

use App\Accounts\StoresTrait;
use App\Subscriptions\Subscribable;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Account extends Model
{
    use StoresTrait, Subscribable;

    protected $guarded = [];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function isEmailConfirmed()
    {
        if(Auth::user()->email_confirm == 1)
            return true;
        return false;
    }


    public function isAccountCompleted()
    {
        if($this->address && $this->zipcode && $this->city && $this->country)
            return true;

        return false;
    }

    public function isConnectionSetup()
    {
        if(currentStore()->connections()->count()>0)
            return true;
        return false;
    }

    public function isProductsImported()
    {
        if(currentStore()->products()->count()>0)
            return true;
        return false;
    }

    public function subscriptionStatus()
    {
        
        if($this->onTrial()){
            return 'On Trial (expires in '.Carbon::now()->diffInDays(Carbon::parse($this->trial_ends_at)).' days)';
        }

        return 'Not subscribed';
    }

    public function hasActiveSubscription()
    {
        if($this->subscriptions()->count())
            return true;

        return false;
    }
}
