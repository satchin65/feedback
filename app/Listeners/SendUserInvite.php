<?php

namespace App\Listeners;

use App\Events\UserInvited;
use App\Mail\InviteUser;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendUserInvite
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
    public function handle(UserInvited $event)
    {
        Mail::to($event->invite->email)->send(new InviteUser($event->user, $event->invite));
    }
}
