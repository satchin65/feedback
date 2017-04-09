<?php

namespace App\Http\Controllers\Statistics;

use App\ProductStatistics;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ProductStatsController extends Controller
{
    public function getLabels()
    {
        $all_products = currentStore()->productStatistics()->orderBy('date', 'DESC')->pluck('date')->take(7);
        $all_products = $all_products->transform(function($date) {
           return Carbon::createFromFormat('Y-m-d',$date)->formatLocalized('%d %b');
        });
        return array_flatten($all_products->reverse()->toArray());
    }

    public function getStats()
    {

        $all_products = currentStore()->productStatistics()->orderBy('date', 'DESC')->pluck('amount')->take(7);
        /*$result[] = [
            'label' => "All products",
            'backgroundColor' => "rgba(0, 121, 197, 0.2)",
            'borderColor' => "rgba(0, 121, 197, 0.8)",
            'data' => array_flatten($all_products->reverse()->toArray()),
        ];*/


        $backgroundcolour = [
            1 => 'rgba(0, 121, 197, 0.2)',
            2 => 'rgba(197,111,0,0.4)'
        ];

        $i=0;
        foreach (currentStore()->marketplaces()->get() as $marketplace){
            $i++;

            $mp_products = currentStore()->productStatistics()->where('marketplace_id', $marketplace->id)->orderBy('date', 'DESC')->pluck('amount')->take(7);


                $amount = count($all_products)-count($mp_products);
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
}
