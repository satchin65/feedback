<?php

namespace App;

use App\Events\ChargePaid;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Mollie\Laravel\Facades\Mollie;

class Charge extends Model
{

    protected $fillable = ['subscription_id',
        'mollie_id',
        'mode',
        'amount',
        'description',
        'method',
        'status',
        'expiry_period',
        'created_datetime',
        'paidDatetime',
        'cancelled_datetime',
        'expired_datetime',
        'profile_id',
        'customer_id',
        'recurring_type',
        'mandate_id',
        'mollie_subscription_id',
        'locale',
        'metadata',
        'details',
        'paymenturl'];

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }


    public function updateCharge()
    {

        $unpaid = 0;
        if($this->status != 'paid')
            $unpaid = 1;

        if(!$this->mollie_id)
            return false;

        $payment_status = Mollie::api()->payments()->get($this->mollie_id);
        $this->status = $payment_status->status;
        $this->method = $payment_status->method;
        $this->amountRefunded = $payment_status->amountRefunded;
        $this->paid_datetime = Carbon::parse($payment_status->paidDatetime);
        $this->mandate_id = $payment_status->mandateId;
        $this->details = json_encode($payment_status->details);
        $this->save();

        Log::info('paid status '.$unpaid);
        Log::info('New payment status '.$payment_status->status);


        if($unpaid == 1 && $payment_status->status == 'paid')
            $this->processPayment();

    }

    public static function addNewCharge($chargeId)
    {

        $payment_status = Mollie::api()->payments()->get($chargeId);
        $subscription = Subscription::find($payment_status->metadata->subscription_id);
        if(!$subscription)
            return false; Log::info('Subscription ' . $payment_status->metadata->subscription_id . ' Not found');

        /*dd($payment_status->metadata->subscription_id);*/
        $charge = new Charge([
            'subscription_id' => $payment_status->metadata->subscription_id,
            'mollie_id' => $chargeId,
            'mode' => $payment_status->mode,
            'amount' => $payment_status->amount,
            'amountRefunded' => $payment_status->amountRefunded,
            'description' => $payment_status->description,
            'method' => $payment_status->method,
            'status' => $payment_status->status,
            'expiry_period' => $payment_status->expiryPeriod,
            'created_datetime' => Carbon::parse($payment_status->createdDatetime),
            'paid_datetime' => Carbon::parse($payment_status->paidDatetime),
            'cancelled_datetime' => Carbon::parse($payment_status->cancelledDatetime),
            'expired_datetime' => Carbon::parse($payment_status->expiredDatetime),
            'profile_id' => $payment_status->profileId,
            'customer_id' => $payment_status->customerId,
            'recurring_type' => $payment_status->recurringType,
            'mandate_id' => $payment_status->mandateId,
            'mollie_subscription_id' => $payment_status->subscriptionId,
            'locale' => $payment_status->locale,
            'metadata' => json_encode($payment_status->metadata), // json
            'details' => json_encode($payment_status->details),
            'paymenturl' => $payment_status->getPaymentUrl()
        ]);

        $charge->save();

        if($payment_status->status == 'paid')
            $charge->processPayment();

        return $charge;
    }


    public function processPayment()
    {
        $this->subscription->processNewPayment($this);
        event(new ChargePaid($this));
    }
}
