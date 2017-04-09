<?php

use App\Role;
use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'firstname' => 'Kay',
            'lastname' => "in 't Veen",
            'phone' => '06-52442474',
            'email' => 'k.veen@microdesign.nl',
            'admin' => 1,
            'password' => bcrypt('M1cr01932'),
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);

        DB::table('account_user')->insert([
            'account_id' => 1,
            'user_id' => 1,
            'role_id' => 1,
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
    }
}
