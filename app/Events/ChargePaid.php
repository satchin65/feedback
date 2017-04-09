<?php

namespace App\Events;

use App\Charge;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ChargePaid
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    /**
     * @var Charge
     */
    public $charge;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Charge $charge)
    {
        //
        $this->charge = $charge;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
