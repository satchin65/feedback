<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{

    protected $guarded = [];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function charge()
    {
        return $this->belongsTo(Charge::class);
    }

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }

    /**
     * @param Account $account
     * @param Subscription $subscription
     * @param Charge $charge
     * @return Invoice
     */
    public static function createInvoice(Account $account, Subscription $subscription, Charge $charge)
    {
        $invoice = new Invoice();

        $invoice->subscription_id = $subscription->id;
        $invoice->account_id = $account->id;
        $invoice->charge_id = $charge->id;
        $invoice->company = $account->name;
        $invoice->address = $account->address;
        $invoice->zipcode = $account->zipcode;
        $invoice->city = $account->city;
        $invoice->tax_id = $account->tax_id;
        $invoice->country = $account->country;
        $invoice->email = $account->email;
        $invoice->description = $charge->description;
        $invoice->amount = round($charge->amount/$subscription->tax_amount,2);
        $invoice->tax = $charge->amount-round($charge->amount/$subscription->tax_amount,2);
        $invoice->total = $charge->amount;
        $invoice->save();

        return $invoice;

    }

}
