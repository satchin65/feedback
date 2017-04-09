<?php


namespace App\Http\Controllers;

use App\Account;
use Illuminate\Http\Request;
use Session;
use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class AccountsController extends Controller
{

    private $user;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {

            if (!Auth::user()) {
                redirect('/login');
            }

            $this->user = Auth::user();

            return $next($request);
        });
    }

    /**
     * Get the account choose page
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        // Get he's connected accounts
        $accounts = $this->user->accounts()->get();

        return view('accounts/index', compact('accounts'));
    }


    /**
     * Select the chosen account.
     *
     * @param $id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function selectAccount($id)
    {
        // Check if account is connected to user and is active
        if (!$this->user->hasAccount($id)) {
            flash('Not allowed', 'You do not have access to this account, or it is not active', 'error');
            return redirect('/accounts');
        }

        Session::put('account', $id);
        return redirect('/dashboard');
    }



    public function settings()
    {
        if (!Session::has('account')) {
            flash('Choose account first', 'Select your account before proceeding to settings', 'error');
            return redirect('/accounts');
        }

        $account = $this->_getCurrentAccount();

        return view('accounts.settings', compact('account'));
    }

    /**
     * Get current account from session
     *
     * @return mixed
     */
    private function _getCurrentAccount()
    {
        $account = Account::find(Session::get('account'));
        return $account;
    }
}
