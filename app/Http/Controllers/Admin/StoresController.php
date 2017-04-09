<?php

namespace App\Http\Controllers\Admin;

use App\Account;
use App\Store;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Support\Facades\Session;

class StoresController extends Controller
{

    public function index()
    {
        $stores = Store::paginate(30);
        return view('admin.stores.index', compact('stores'));
    }


    public function login(Account $account, Store $store)
    {
        Session::put('account', $account->id);
        Session::put('store', $store->id);
        return redirect('/dashboard');
    }
}