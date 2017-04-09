<?php

use Illuminate\Database\Seeder;

class StoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('stores')->insert([
            'account_id' => 1,
            'name' => 'Schoenen-winkel.nl',
            'url' => 'http://www.schoenen-winkel.nl',
            'type' => 'Magento',
            'active' => 1,
            'published' => 1,
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);

        DB::table('stores')->insert([
            'account_id' => 1,
            'name' => 'cipriani Online',
            'url' => 'http://www.cipriani-online.com',
            'type' => 'Magento',
            'active' => 1,
            'published' => 0,
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);

        DB::table('stores')->insert([
            'account_id' => 1,
            'name' => 'Mobi Car Systems',
            'url' => 'http://www.mobicarsystems.nl',
            'type' => 'Magento',
            'active' => 1,
            'published' => 0,
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);
    }
}
