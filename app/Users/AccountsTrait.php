<?php

namespace App\Users;

use App\Role;
use Illuminate\Support\Facades\DB;

trait AccountsTrait
{
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     * Returning all accounts related to this user model
     */
    public function accounts()
    {
        return $this->belongsToMany(\App\Account::class)->withTimestamps();
    }

    public function assignAdminAccount($account)
    {
        return $this->_assignAccount($account, 1);
    }

    public function assignManagerAccount($account)
    {
        return $this->_assignAccount($account, 2);
    }

    public function assignOwnerAccount($account)
    {
        return $this->_assignAccount($account, 3);
    }

    public function isOwner()
    {
        $pivot = DB::table('account_user')
            ->where('account_id', $account->id)
            ->where('user_id', $this->id)->first();

        // if geen pivot of = geen owner
        if(!$pivot || $pivot->role_id != 3)
            return false;
        return true;
    }

    public function isAdmin()
    {
        $pivot = DB::table('account_user')
            ->where('account_id', currentAccount()->id)
            ->where('user_id', $this->id)->first();

        // if geen pivot of = beheerder
        if(!$pivot || $pivot->role_id == 2)
            return false;
        return true;
    }


    public function getCurrentAccountRole($account)
    {
        $pivot = DB::table('account_user')
                    ->where('account_id', currentAccount()->id)
                    ->where('user_id', $this->id)->first();
        if(!$pivot)
            return '';

        $role = Role::find($pivot->role_id);

        if(!$role)
            return '';

        return $role->display_name;
    }

    public function _assignAccount($account, $role_id)
    {
        return DB::table('account_user')->insert([
            'account_id' => $account->id,
            'user_id' => $this->id,
            'role_id' => $role_id
        ]);
    }

    /**
     * Assign a account to a user
     *
     * @param $account
     * @return mixed
     */
    public function detachAccount($account)
    {
        return $this->accounts()->detach($account);
    }

    /**
     * Check if user has access to this account and is active
     *
     * @param $id
     * @return bool
     */
    public function hasAccount($id)
    {
        foreach ($this->accounts as $account) {
            if ($account->id == $id && $account->active) {
                return true;
            }
        }
        return false;
    }
}
