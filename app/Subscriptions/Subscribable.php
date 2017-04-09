<?php

namespace App\Subscriptions;

use App\Charge;
use App\Plan;
use App\Subscription;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Mollie\Laravel\Facades\Mollie;

trait Subscribable
{

    public function createCustomer($account, $email)
    {


        $mollieCustomer = Mollie::api()->customers()->create([
                "name"  => $account->name,
                "email" => $email,
                "locale" => "nl_NL"
            ]);

        $account->mollie_id = $mollieCustomer->id;
        $account->save();
    }



    public function onTrial()
    {
        if (empty($this->trial_ends_at)) {
            return false;
        }
        return true;
    }


    public function subscription($subscription = 'small')
    {
        return $this->subscriptions->sortByDesc(function ($value) {
            return $value->created_at->getTimestamp();
        })
        ->first(function ($value) use ($subscription) {
            return $value->name === $subscription;
        });
    }


    public function subscriptions()
    {
        return $this->hasMany(Subscription::class, $this->getForeignKey())->orderBy('created_at', 'desc');
    }

    public function getSubscriptions()
    {
        return $this->subscriptions()->get();
    }


    // period monthly quartally yearly
    public function subscribeToPlan($plan)
    {
        $subscription = $this->setupSubscription($plan);

        return redirect($this->startSubscription($subscription));
    }

    protected function setupSubscription($plan)
    {

        $newsub = Subscription::create([
            'account_id' => $this->id,
            'starts_at' => Carbon::now(),
            'ends_at' => Carbon::now(),
            'active' => 0
        ]);
        $newsub->addPlan($plan);
        $newsub->tax_amount = $this->checkTaxAmount();
        $newsub->amount     = $this->countChargeAmountPlans($newsub, $newsub->plans()->get());
        $newsub->save();
        return $newsub;
    }


    public function startSubscription($subscription)
    {
        $plans              = $subscription->plans()->get();
        $planDescription    = $subscription->planDescription($plans);
        $amount             = $this->countChargeAmountPlans($subscription, $plans);
        $payment            = $this->makeFirstCharge($subscription, $amount, $planDescription);
        return $payment->paymenturl;
    }

    protected function makeFirstCharge($subscription, $amount, $planDescription)
    {
        $checkOpenCharge = Charge::where('subscription_id', $subscription->id)->where('status', 'open')->where('amount', $amount);
        if ($checkOpenCharge->count()) {
            return $checkOpenCharge->first();
        }

        $payment = Mollie::api()->payments()->create([
            'amount'        => $amount,          // 1 cent or higher
            'customerId'    => $this->getCustomerId(),
            'recurringType' => 'first',       // important
            'description'   => $planDescription,
            'webhookUrl'    => env('APP_URL', 'http://app.feedstack.io').'/mollie/webhook/',
            'metadata'      => ['subscription_id' => $subscription->id, 'account_id' => $this->id],
            'redirectUrl'   => env('APP_URL', 'http://app.feedstack.io').'/settings/finance/',
        ]);

        return Charge::create([
            'subscription_id' => $subscription->id,
            'mollie_id' => $payment->id,
            'mode' => $payment->mode,
            'amount' => $payment->amount,
            'description' => $payment->description,
            'method' => $payment->method,
            'status' => $payment->status,
            'expiry_period' => $payment->expiryPeriod,
            'created_datetime' => Carbon::parse($payment->createdDatetime),
            'paid_datetime' => Carbon::parse($payment->paidDatetime),
            'cancelled_datetime' => Carbon::parse($payment->cancelledDatetime),
            'expired_datetime' => Carbon::parse($payment->expiredDatetime),
            'profile_id' => $payment->profileId,
            'customer_id' => $payment->customerId,
            'recurring_type' => $payment->recurringType,
            'mandate_id' => $payment->mandateId,
            'mollie_subscription_id' => $payment->subscriptionId,
            'locale' => $payment->locale,
            'metadata' => json_encode($payment->metadata), // json
            'details' => $payment->details, // json
            'paymenturl' => $payment->getPaymentUrl(),
        ]);
    }

    protected function countChargeAmountPlans($subscription, $plans)
    {
        $amount = 0;
        foreach ($plans as $plan) {
            $amount += $plan->amount;
        }
        $amount = $this->checkDiscounts($subscription, $amount);
        $amount = $this->checkTax($subscription, $amount);
        return round($amount, 2);
    }


    protected function checkDiscounts($subscription, $amount)
    {
        if ($subscription->discount_amount>0)
            $amount = $amount-$subscription->discount_amount;

        if ($subscription->discount_percentage>0)
            $amount = $amount * ((100-$amount) / 100);

        return round($amount/100,2);
    }

    protected function checkTax($subscription, $amount)
    {
        $amount = $amount*$subscription->tax_amount;

        return round($amount,2);
    }

    protected function checkTaxAmount()
    {
        if($this->country == 'nl')
            return 1.21;
        return 1;
    }


    public function getCustomerId()
    {
        if (!$this->mollie_id) {
            $user = Auth::user();
            $this->createCustomer($this, $user->email);
        }
        return $this->mollie_id;
    }
}
