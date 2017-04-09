<?php

use App\Account;
use App\User;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MollieTest extends BrowserKitTestCase
{

    public function testNewCustomer()
    {

        return Mollie::api()->customers()->create([
            "name"  => "Kay in t Veen",
            "email" => "k.veen@microdesign.nl",
        ]);

    }


    public function testMollieCustomerController()
    {
        $account = Account::find(10);
        $user = User::find(7);
        return $account->createCustomer($account, $user->email);

    }


    public function testFirstPayment()
    {
        $payment = Mollie::api()->payments()->create([
            'amount'        => 0.01,          // 1 cent or higher
            'customerId'    => 'cst_RS4j2V8QQP',
            'recurringType' => 'first',       // important
            'description'   => 'First payment',
            'redirectUrl'   => 'https://webshop.example.org/order/12345/',
        ]);

    }

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertTrue(true);
    }




}
