<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

use Carbon\Carbon;

$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'firstname' => $faker->firstName,
        'lastname' => $faker->lastName,
        'company' => $faker->company,
        'email' => $faker->unique()->safeEmail,
        'phone' => $faker->phoneNumber,
        'password' => $password ?: $password = bcrypt('secret')
    ];
});


$factory->define(App\Store::class, function (Faker\Generator $faker) {

    return [
        'sku' => str_random(10),
        'ean' => $faker->ean13,
        'name' => $faker->name,
        'account_id' => 1,

    ];
});


$factory->define(App\Account::class, function (Faker\Generator $faker) {

    return [
        'name' => $faker->firstName,
        'active' => 1,
        'trial_ends_at' => Carbon::now()->addDay(2),
        'langyage' => 'nl',
        'address' => $faker->address,
        'zipcode' => $faker->postcode,
        'city' => $faker->city,
        'country' => 'nl',
        'email' => $faker->unique()->safeEmail
    ];
});



$factory->define(App\Product::class, function (Faker\Generator $faker) {

    return [

        'sku' => str_random(10),
        'ean' => $faker->ean13,
        'name' => $faker->name,
        'store_id' => 1,

        'color' => $faker->colorName,
        'material' => $faker->word,
        'gender' => $faker->randomElement(['man','vrouw','meisje','jongen','m','f','male','heren','dames']),

        'stock' => $faker->randomDigit,
        'stockdate' => $faker->date(),
        'delivery_time' => $faker->randomElement(['24h 19:00','voor 7 uur morgen in huis','1-2 werkdagen','1 werkdag','2-4 werkdagen','24h 17:00','Vandaag in huis'], 1),
        'delivery_time_out_of_stock' => $faker->randomElement(['24h 19:00','voor 7 uur morgen in huis','1-2 werkdagen','1 werkdag','2-4 werkdagen','24h 17:00','Vandaag in huis'], 1),

        'price' => $faker->randomFloat(4, 1, 9999),
        'cost' => $faker->randomFloat(4, 1, 9999),
        'special_price' => $faker->randomFloat(4, 1, 9999),

        'short_description' => $faker->text(600),
        'description' => $faker->paragraphs(random_int(2, 10), true),

    ];
});



$factory->define(App\Marketplace::class, function (Faker\Generator $faker) {

    return [
        'name' => 'Bol '.str_random(5),
        'store_id' => 1,
        'entity' => 'MarketplaceBol',
        'identifier' => 'sku', // what makes a product unique, or identify with your store
        'attributes' => '{"api_key": "cVukWazQmQRfiEabLWbansLcwLmPziXm", "api_secret": "VFlhOVcZjqrjqsIcURfvqNZCtmqgooQthLQNyRlCQVReARPWbWDJdCWdfmTWKfwEYOTvSzVvzZDfWMfKXFbVseOUkcItNhPyKsLEqWhdoOnkwkxQcpZQUPxHcVnoeCxZGkgOZJeyjgHGefndoVTuQCrEpPoGMbpdwbjfskkfPYemNRDGanxfDFSOjeqETTnLECrnsIZKhDcLNwQZZAXQswnlkHHFIhRJpysYRANkqrtPRzdcMJtbdwuubgPfWYMC"}'
    ];
});



$factory->define(App\Modifier::class, function (Faker\Generator $faker) {

    return [
        'marketplace_id' => 1,
        'name' => 'operation '.rand(5),
        'paused' => 0
    ];
});
