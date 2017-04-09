<?php

namespace App\Http\Controllers;

use App\Store;
use Illuminate\Http\Request;

use Session;
use App\Account;
use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class StoresController extends Controller
{
    private $account;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {

            if (!Auth::user()) {
                redirect('/login');
            }

            if (!Session::has('account')) {
                redirect('/accounts');
            }

            $this->account = Account::find(Session::get('account'));

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
        $stores = currentAccount()->stores()->get();

        return view('stores/index', compact('stores'));
    }

    public function create()
    {
        // Get he's connected accounts
        $stores = currentAccount()->stores()->get();

        return view('stores.create', compact('stores'));
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
            'url' => 'required|active_url',
        ]);

        $account = currentAccount();
            $data = $request->all() + ['account_id' => $account->id];
        $store = Store::create($data);

        return $this->selectStore($store->id);
    }

    /**
     * Select the chosen account.
     *
     * @param $id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function selectStore($id)
    {
        // Check if account is connected to user and is active
        if (!$this->account->hasStore($id)) {
            flash('Not allowed', 'You do not have access to this account, or it is not active', 'error');
            return redirect('/stores');
        }

        Session::put('store', $id);
        return redirect('/dashboard');
    }
}
