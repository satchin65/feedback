<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AccountSeeder::class);
        $this->call(UserRoleSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(StoreSeeder::class);
        $this->call(ProductSeeder::class);
    }
}
