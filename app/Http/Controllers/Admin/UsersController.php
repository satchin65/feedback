<?php

namespace App\Http\Controllers\Admin;

use App\User;
use App\Http\Controllers\Controller;
use App\Http\Requests;

class UsersController extends Controller
{

    public function index()
    {

        $users = User::paginate(30);
        return view('admin.users.index', compact('users'));

    }
}