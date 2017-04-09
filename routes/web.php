<?php
// $user = App\User::first();
// Auth::login($user);
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/


use App\BolPlazaClient\BolPlazaClient;
use App\Charge;
use App\Jobs\ProcessMarketplaceEntityProducts;
use App\Product;
use Mollie\Laravel\Facades\Mollie;

Auth::routes();

Route::get('test', function(){

    $store = currentStore();
    $products = $store->products->pluck('sku')->all();
    dd(count($products));

    $account = currentAccount();
    $mandates = Mollie::api()->customersSubscriptions()->withParentId('cst_TER5sua75y')->cancel('sub_awjFNVqB9B');
    //$mandates = Mollie::api()->customersSubscriptions()->withParentId('cst_TER5sua75y')->all();
    dd($mandates);

});


Route::post('/mollie/webhook', function (\Illuminate\Http\Request $request) {
    Log::info('Mollie push: '.json_encode($request->all()));
    $charge = \App\Charge::where('mollie_id',$request->input('id'))->first();
    if(!$charge) {
        Charge::addNewCharge($request->input('id'));
    }else{
        $charge->updateCharge();
    }
});



Route::get('/email/confirm/{confirm}', 'SettingsController@confirm_email');
Route::get('/join/{account}/{code}', 'InviteController@join');


Route::group(['middleware' => ['auth']], function () {
    Route::get('/logout', function () {
        Session::forget('account');
        Session::forget('store');
        Auth::logout();
        return redirect('/login');
    });
});

Route::get('/files/{hash}/{filename}', 'Feeds\FeedsController@getFile');


Route::group(['middleware' => ['auth', 'AccountCheck']], function () {
    // Stores
    Route::get('/stores', 'StoresController@index');
    Route::get('/stores/create', 'StoresController@create');
    Route::post('/stores/create', 'StoresController@store');
    Route::get('/stores/choose/{id}', 'StoresController@SelectStore');
});


Route::group(['middleware' => ['auth','AccountCheck', 'StoreCheck']], function () {


    Route::get('/order/subscription/{plan}', function ($plan) {
        $account = currentAccount();
        $subscription = $account->newSubscription($plan, 'monthly');
        return $account->startSubscription($subscription);
    });



    Route::get('/', 'HomeController@index');
    Route::get('/dashboard', 'HomeController@index');

    // Accounts
    Route::get('/accounts', 'AccountsController@index');
    Route::get('/account/settings', 'AccountsController@settings');
    Route::get('/accounts/choose/{id}', 'AccountsController@selectAccount');


    // Settings
    Route::get('/settings', 'SettingsController@redirect');
    Route::get('/settings/account', 'SettingsController@account');
    Route::get('/settings/store', 'SettingsController@store');
    Route::get('/settings/users', 'SettingsController@users');
    Route::post('/settings/users/invite', 'InviteController@usersInvite');
    Route::get('/settings/profile', 'SettingsController@profile');
    Route::get('/settings/profile/resend_email_confirmation', 'SettingsController@resendWelcomeEmail');

    Route::get('/settings/finance', 'Settings\FinanceController@index');
    Route::post('/settings/finance', 'Settings\FinanceController@create');

    // Settings
    Route::post('/settings/account', 'SettingsController@store_account');
    Route::post('/settings/store', 'SettingsController@store_store');
    Route::post('/settings/profile', 'SettingsController@store_profile');

    // Connections
    Route::get('/connections', 'ConnectionsController@index');
    Route::get('/connections/create', 'ConnectionsController@create');
    Route::post('/connections/', 'ConnectionsController@add');
    Route::get('/connections/{id}', 'ConnectionsController@edit');
    Route::post('/connections/{connection}', 'ConnectionsController@update');
    Route::get('/connections/{id}/delete', 'ConnectionsController@delete');
    Route::get('/connections/{id}/start_import', 'ConnectionsController@startImport');
    Route::get('/connections/{id}/import_status', 'ConnectionsController@importStatus');
    Route::get('/connections/{id}/mapping', 'ConnectionsController@mapping');
    Route::post('/connections/{id}/mapping', 'ConnectionsController@storeMapping');
    Route::get('/connections/{id}/mapping/reset', 'ConnectionsController@resetMapping');
    Route::get('/connections/{id}/mapping/custom-field', 'ConnectionsController@addCustomField');


    // Marketplaces
    Route::get('/marketplaces', 'MarketplacesController@index');
    Route::get('/marketplaces/create', 'MarketplacesController@create');
    Route::post('/marketplaces/create', 'MarketplacesController@add');
    Route::get('/marketplaces/{id}', 'MarketplacesController@edit');
    Route::post('/marketplaces/{id}', 'MarketplacesController@update');
    Route::get('/marketplaces/{id}/delete', 'MarketplacesController@delete');

    Route::get('/marketplaces/{id}/mapping', 'MarketplacesController@mapping');
    Route::post('/marketplaces/{id}/mapping', 'MarketplacesController@saveMapping');

        Route::get('/marketplaces/{id}/filter', 'MarketplacesController@filters');
        Route::get('/marketplaces/{id}/filter/new', 'MarketplacesController@newFilter');
        Route::get('/marketplaces/{id}/filter/{modifier}', 'MarketplacesController@filtersDetail');
        Route::post('/marketplaces/{id}/filter/{modifier}', 'MarketplacesController@saveFilter');
        Route::get('/marketplaces/{id}/filter/{modifier}/delete', 'MarketplacesController@deleteModifier');
        Route::get('/marketplaces/{id}/filter/{modifier}/delete/{filter}', 'MarketplacesController@deleteFilter');
        Route::get('/marketplaces/{id}/filter/{modifier}/add-and', 'MarketplacesController@addAndFilter');

        Route::get('/marketplaces/{id}/action/{modifier}/delete/{action}', 'MarketplacesController@deleteAction');
        Route::get('/marketplaces/{id}/action/{modifier}/add-and', 'MarketplacesController@addAction');

    Route::get('/marketplaces/{id}/preview', 'MarketplacesController@preview');
    Route::get('/marketplaces/{id}/preview/{status}', 'MarketplacesController@preview');



    Route::resource('feeds', 'Feeds\FeedsController');
    Route::resource('/feeds/{id}/mapping', 'Feeds\FeedsMappingController', ['only' => ['index', 'store']]);

    Route::get('/feeds/{id}/filter', 'Feeds\FeedsController@filters');
    Route::get('/feeds/{id}/filter/new', 'Feeds\FeedsController@newFilter');
    Route::get('/feeds/{id}/filter/{modifier}', 'Feeds\FeedsController@filtersDetail');
    Route::post('/feeds/{id}/filter/{modifier}', 'Feeds\FeedsController@saveFilter');
    Route::get('/feeds/{id}/filter/{modifier}/delete', 'Feeds\FeedsController@deleteModifier');
    Route::get('/feeds/{id}/filter/{modifier}/delete/{filter}', 'Feeds\FeedsController@deleteFilter');
    Route::get('/feeds/{id}/filter/{modifier}/add-and', 'Feeds\FeedsController@addAndFilter');

    Route::get('/feeds/{id}/categories', 'Feeds\FeedsController@categories');
    Route::get('/feeds/{id}/get_categories', 'Feeds\FeedsController@get_categories');
    Route::post('/feeds/{id}/post_categories', 'Feeds\FeedsController@post_categories');
    Route::get('/feeds/{id}/new_category', 'Feeds\FeedsController@new_category');
    Route::get('/feeds/{id}/get_main_category', 'Feeds\FeedsController@get_main_category');
    Route::post('/feeds/{id}/post_main_category', 'Feeds\FeedsController@post_main_category');
    Route::get('/feeds/{id}/action/{modifier}/delete/{action}', 'Feeds\FeedsController@deleteAction');
    Route::get('/feeds/{id}/action/{modifier}/add-and', 'Feeds\FeedsController@addAction');
    Route::get('/feeds/{id}/preview', 'Feeds\FeedsController@preview');
    Route::get('/feeds/{id}/preview/{status}', 'Feeds\FeedsController@preview');
    Route::get('/search_categories/{entity}', 'Feeds\FeedsController@search_categories');


    Route::get('/stats/products/get_labels', 'Statistics\ProductStatsController@getLabels');
    Route::get('/stats/products/get_stats', 'Statistics\ProductStatsController@getStats');

    Route::get('/stats/orders/get_labels', 'Statistics\OrderStatsController@getLabels');
    Route::get('/stats/orders/get_stats', 'Statistics\OrderStatsController@getStats');
    Route::get('/stats/orders/reindex', 'Statistics\OrderStatsController@reindexPastDays');


    // Orders
    Route::get('/orders', 'OrdersController@index');


    Route::get('/products', 'ProductsController@index');
    Route::get('/products/{id}', 'ProductsController@show');
});


Route::group(['namespace' => 'Admin', 'prefix' => 'admin', 'middleware' => ['auth','AdminCheck']], function () {

    Route::get('accounts', 'AccountsController@index');
    Route::get('stores', 'StoresController@index');
    Route::get('accounts/{account}/stores/{store}/login', 'StoresController@login');
    Route::get('users', 'UsersController@index');

});
