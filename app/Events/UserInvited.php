<?php

namespace App\Events;

use App\Invite;
use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class UserInvited
{
    use SerializesModels;

    public $user;
    /**
     * @var Invite
     */
    public $invite;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(User $user, Invite $invite)
    {
        $this->user = $user;
        $this->invite = $invite;
    }
}
