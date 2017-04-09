<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Mollie\Laravel\Facades\Mollie;

class Subscription extends Model
{

    protected $guarded = [];

    public function plans()
    {
        return $this->belongsToMany(\App\Plan::class);
    }

    public function addPlan($plan)
    {
        $this->plans()->attach($plan);
    }

    public function charges()
    {
        return $this->hasMany(Charge::class);
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function planDescription($plans)
    {
        $plan_names = '';
        foreach ($plans as $plan) {
            if (!empty($plan_names)) {
                $plan_names .= ', ';
            }
            $plan_names .= $plan->name;
        }
        return 'FeedStack subscription '.$plan_names;
    }

    public function processNewPayment(Charge $charge)
    {
        if($charge->status != 'paid')
            return false;

        $new_end_date = Carbon::now()->addMonth();
        $current_end_date = $this->ends_at;
        if($current_end_date && $current_end_date > Carbon::now())
            $new_end_date  = Carbon::parse($current_end_date)->addMonth();

        $this->update([
            'mandate_id' => $charge->mandate_id,
            'active' => 1,
            'ends_at' => $new_end_date
        ]);

        if($charge->recurring_type == 'first')
            $this->setupMonthlySubscription($charge);
    }

    private function setupMonthlySubscription(Charge $charge)
    {
        $subscription = Mollie::api()->customersSubscriptions()->withParentId($charge->customer_id)->create([
            "amount"      => $charge->amount,
            "interval"    => "1 month",
            "description" => $charge->description,
            "startDate"   => Carbon::parse($this->ends_at)->format('Y-m-d')
        ]);
        $this->subscription_id = $subscription->id;
        $this->save();
        Log::info('Setup subscription: '.json_encode($subscription));
    }
}
