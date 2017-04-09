<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;


class Store extends Model
{

    //protected $fillable = ['name','url','account_id'];
    protected $guarded = [];

    public function account()
    {
        return $this->belongsTo(\App\Account::class);
    }

    public function connections()
    {
        return $this->hasMany(Connection::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function marketplaces()
    {
        return $this->hasMany(Marketplace::class);
    }

    public function feeds()
    {
        return $this->hasMany(Feed::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function customers()
    {
        return $this->hasMany(Customer::class);
    }

    public function productStatistics()
    {
        return $this->hasMany(ProductStatistics::class);
    }

    public function orderStatistics()
    {
        return $this->hasMany(OrderStatistics::class);
    }

    public function isStoreAllowed()
    {
        return $this->isUserAllowed(Auth::user());
    }

    private function isUserAllowed($user)
    {
        return $user->hasAccount($this->account->id);
    }



    public function generateApiKey()
    {
        $hash = str_random(30);
        $this->api_key = $hash;
        $this->save();
    }

    public function getApiStatus()
    {
        $client = new Client(['http_errors' => false]);
        $res = $client->request('POST', $this->url.'/fsconnect/index/info',[
            'form_params' => [
                'api_key' => $this->api_key,
                'store_id' => 1,
            ]
        ]);

        if($res->getStatusCode() != 200)
            return false;

        $status = json_decode($res->getBody());

        if(! $status->active)
            return 'Plugin installed but in-active';

        if($status->success)
            return 'Connected succesfully ('.$status->magento_version.')';

        return false;

    }
}
