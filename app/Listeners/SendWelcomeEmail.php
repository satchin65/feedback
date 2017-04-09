<?php

namespace App\Listeners;

use App\Events\NewAccountCreated;
use App\Mail\WelcomeToFeedstack;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendWelcomeEmail implements ShouldQueue
{
    use InteractsWithQueue;
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
     * @param  NewAccountCreated  $event
     * @return void
     */
    public function handle(NewAccountCreated $event)
    {
        Mail::to($event->user->email)->send(new WelcomeToFeedstack($event->user));
    }
}
