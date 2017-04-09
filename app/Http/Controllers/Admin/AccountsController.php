<?php

namespace App\Http\Controllers\Admin;

use App\Account;
use App\Http\Controllers\Controller;
use App\Http\Requests;

class AccountsController extends Controller
{

    public function index()
    {

        $accounts = Account::paginate(30);
        return view('admin.accounts.index', compact('accounts'));

    }
}