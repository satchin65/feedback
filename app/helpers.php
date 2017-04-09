<?php

use App\Store;
use App\Account;
use Illuminate\Support\Facades\Session;

function flash($message, $title, $type)
{
    $flash = app(\App\Http\Flash::class);

    return $flash->message($message, $title, $type);
}

function currentAccount()
{
    if (!Session::has('account')) {
        return new Account;
    }

    $account = Account::find(Session::get('account'));
    if (!$account) {
        return new Account;
    }

    return $account;
}

function currentStore()
{
    if (!Session::has('store')) {
        return new Store;
    }

    $store = Store::find(Session::get('store'));
    if (!$store) {
        return new Store;
    }
    if(!$store->api_key){
        $store->generateApiKey();
        $store->fresh();
    }

    return $store;
}
