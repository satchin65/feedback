<?php

namespace App\Listeners;

use App\Events\ChargePaid;
use App\Invoice;
use App\Mail\NewPaidInvoice;
use Illuminate\Support\Facades\Mail;

//use Illuminate\Queue\InteractsWithQueue;
//use Illuminate\Contracts\Queue\ShouldQueue;

class ChargeInvoice
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  ChargePaid  $event
     * @return void
     */
    public function handle(ChargePaid $event)
    {
        $charge = $event->charge;
        $subscription = $charge->subscription;
        $account = $subscription->account;
        $invoice = Invoice::createInvoice($account, $subscription, $charge);

        Mail::to($account->email)->send(new NewPaidInvoice($charge,$subscription,$invoice));

    }
}
