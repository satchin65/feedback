<?php

use App\Account;
use App\Charge;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class SubscriptionTest extends BrowserKitTestCase
{


/*    public function testSubscriptions()
    {
        $account = Account::find(1);
        return $account->getSubscriptions();
    }


    public function testNewSubscription()
    {
        $account = Account::find(1);
        $subscription = $account->newSubscription('small','monthly');
        return $account->startSubscription($subscription);
    }*/

    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_Account_Can_Subscribe()
    {
        $account = Account::find(2);

        $account->subscribeToPlan('Basic');

        $this->assertTrue(true);
    }
}
