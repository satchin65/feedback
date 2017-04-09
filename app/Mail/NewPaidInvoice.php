<?php

namespace App\Mail;

use App\Charge;
use App\Invoice;
use App\Subscription;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewPaidInvoice extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    /**
     * @var Charge
     */
    public $charge;
    /**
     * @var Subscription
     */
    public $subscription;
    /**
     * @var Invoice
     */
    private $invoice;

    /**
     * Create a new message instance.
     *
     * @param Charge $charge
     * @param Subscription $subscription
     * @param Invoice $invoice
     */
    public function __construct(Charge $charge, Subscription $subscription, Invoice $invoice)
    {
        $this->charge = $charge;
        $this->subscription = $subscription;
        $this->invoice = $invoice;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.invoice')
            ->subject(trans('mails.New invoice paid'))
            ->with([
                'charge' => $this->charge,
                'subscription' => $this->subscription,
                ]);
    }
}
