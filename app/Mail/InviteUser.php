<?php

namespace App\Mail;

use App\Invite;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class InviteUser extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $invite;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, Invite $invite)
    {
        $this->user = $user;
        $this->invite = $invite;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.invite')
                    ->subject(trans('mails.:firstname invited you to join :accountname on FeedStack', ['firstname' => $this->user->firstname, 'accountname' => $this->invite->account->name]))
                    ->with(['user' => $this->user, 'invite' => $this->invite]);
    }
}
