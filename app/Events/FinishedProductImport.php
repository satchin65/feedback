<?php

namespace App\Events;

use App\Connection;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Support\Facades\Log;

class FinishedProductImport implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    /**
     * @var Connection
     */
    private $importconnection;
    public $status;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Connection $importconnection, $status)
    {
        $this->importconnection = $importconnection;
        $this->status = $status;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        Log::info('Finished product import.', ['connection' => $this->importconnection->id]);
        return new PrivateChannel('connection.' . $this->importconnection->id . '.status');
    }
}
