<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\SlackMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Log;

class SlackNewBolOrderReceived extends Notification
{
    use Queueable;

    /**
     * @var
     */
    private $order;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($order)
    {
        $this->order = $order;
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
        Log::info('New BOL order received: '.$this->order->order_number.' ', ['marketplace' => $this->order->marketplace->name, 'store' => $this->order->store->name]);
        return (new SlackMessage)
            ->success()
            ->content('New BOL order received: '.$this->order->order_number.' -  marketplace '.$this->order->marketplace->name.' - store ' .$this->order->store->name);
    }
}
