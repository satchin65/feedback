<?php

namespace App\Accounts;

trait StoresTrait
{

    public function getStores()
    {
        return $this->stores()->get();
    }
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     * Returning all accounts related to this user model
     */
    public function stores()
    {
        return $this->hasMany(\App\Store::class);
    }

    /**
     * Assign a account to a user
     *
     * @param $store
     * @return mixed
     */
    public function assignStore($store)
    {
        return $this->stores()->attach($store);
    }

    /**
     * Assign a account to a user
     *
     * @param $store
     * @return mixed
     */
    public function detachStore($store)
    {
        return $this->stores()->detach($store);
    }

    /**
     * Check if user has access to this account and is active
     *
     * @param $id
     * @return bool
     */
    public function hasStore($id)
    {
        foreach ($this->stores as $store) {
            if ($store->id == $id) {
                return true;
            }
        }
        return false;
    }
}
