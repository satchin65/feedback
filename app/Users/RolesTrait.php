<?php

namespace App\Users;

trait RolesTrait
{
    /**
     * @return mixed
     */
    public function roles()
    {
        return $this->belongsToMany(\App\Role::class)->withTimestamps();
    }
    /**
     * Does the user have a particular role?
     *
     * @param $name
     * @return bool
     */
    public function hasRole($name)
    {
        foreach ($this->roles as $role) {
            if ($role->name == $name) {
                return true;
            }
        }
        return false;
    }

    public function filterRole($name)
    {
        foreach ($this->roles as $role) {
            if ($role->name == $name) {
                return $this;
            }
        }
        return false;
    }

    /**
     * Assign a role to the user
     *
     * @param $role
     * @return mixed
     */
    public function assignRole($role)
    {
        return $this->roles()->attach($role);
    }

    /**
     * Remove a role from a user
     *
     * @param $role
     * @return mixed
     */
    public function removeRole($role)
    {
        return $this->roles()->detach($role);
    }
}
