<?php

namespace App\Notifications;

use App\Connection;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\SlackMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Log;

class SlackConnectionImportRun extends Notification
{
    use Queueable;
    /**
     * @var
     */
    private $productAmount;
    private $feed_connection;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Connection $feed_connection, $productAmount)
    {
        //
        $this->feed_connection = $feed_connection;
        $this->productAmount = $productAmount;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['slack'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toSlack($notifiable)
    {
        Log::info('Connection imported: '.$this->productAmount.' Products', ['connection' => $this->feed_connection->name, 'account' => $this->feed_connection->store->account->name]);
        return (new SlackMessage)
            ->success()
            ->content('Connection import: '.$this->feed_connection->name.' ('.$this->feed_connection->store->account->name.') imported: '.$this->productAmount.' products successfully');
    }


}
