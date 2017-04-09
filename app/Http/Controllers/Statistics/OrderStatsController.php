<?php

namespace App\Http\Controllers\Statistics;

use App\Marketplace;
use App\OrderStatistics;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrderStatsController extends Controller
{
    public function getLabels()
    {
        $all_orders = currentStore()->orderStatistics()->orderBy('date', 'DESC')->pluck('date')->take(7);
        $all_orders = $all_orders->transform(function($date) {
            return Carbon::createFromFormat('Y-m-d',$date)->formatLocalized('%d %b');
        });
        return array_flatten($all_orders->reverse()->toArray());
    }

    public function getStats()
    {

        $all_orders = currentStore()->orderStatistics()->orderBy('date', 'DESC')->pluck('amount')->take(7);

        $backgroundcolour = [
            1 => 'rgba(0, 121, 197, 0.2)',
            2 => 'rgba(197,111,0,0.4)'
        ];
        $i=0;
        foreach (currentStore()->marketplaces()->get() as $marketplace){
            $i++;
            $mp_products = currentStore()->orderStatistics()->where('marketplace_id', $marketplace->id)->orderBy('date', 'DESC')->pluck('amount')->take(7);


                $amount = count($all_orders)-count($mp_products);
                $data = array_flatten($mp_products->reverse()->toArray());
                for ($x = 1; $x <= $amount; $x++) {
                    array_unshift($data, '');
                }
                $result[] = [
                    'label' => $marketplace->name,
                    'backgroundColor' => $backgroundcolour[$i],
                    'borderColor' => "rgba(197,111,0,0)",
                    'borderWidth' => 0,
                    'lineTension' => 0.1,

                    'borderCapStyle' => 'butt',
                    'borderDashOffset' => 0.0,
                    'borderJoinStyle' => 'miter',
                    'pointBorderColor' => $backgroundcolour[$i],
                    'pointBackgroundColor' => "#fff",
                    'pointBorderWidth' => 0,
                    'pointHoverRadius' => 5,
                    'pointHoverBackgroundColor' => $backgroundcolour[$i],
                    'pointHoverBorderColor' => $backgroundcolour[$i],
                    'pointHoverBorderWidth' => 2,
                    'pointRadius' => 1,
                    'pointHitRadius' => 10,

                    'spanGaps' => false,

                    'data' => $data,
                ];

        }



        return $result;

    }

    public function reindexPastDays()
    {
        $marketplaces = Marketplace::all();
        $marketplaces->each(function($marketplace){
            OrderStatistics::add_current_total_revenue_amount(Carbon::now(),$marketplace);
            OrderStatistics::add_current_total_revenue_amount(Carbon::now()->subDay(),$marketplace);
            OrderStatistics::add_current_total_revenue_amount(Carbon::now()->subDays(2),$marketplace);
            OrderStatistics::add_current_total_revenue_amount(Carbon::now()->subDays(3),$marketplace);
            OrderStatistics::add_current_total_revenue_amount(Carbon::now()->subDays(4),$marketplace);
            OrderStatistics::add_current_total_revenue_amount(Carbon::now()->subDays(5),$marketplace);
            OrderStatistics::add_current_total_revenue_amount(Carbon::now()->subDays(6),$marketplace);
            OrderStatistics::add_current_total_revenue_amount(Carbon::now()->subDays(7),$marketplace);
        });
    }
}
