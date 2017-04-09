@extends('layouts.app')

@section('content')

    @include('orders.components.titlebar_base')
    @include('components.titlebar')

    <div class="container">
        <div class="row">
            <div class="panel panel-basic nopadding">

                <table>
                    <thead>
                    <tr>
                        <th width="170">@lang('orders.Order')</th>
                        <th width="120">@lang('orders.Status')</th>
                        <th>@lang('orders.Marketplace')</th>
                        <th>@lang('orders.Last name')</th>
                        <th>@lang('orders.Zipcode')</th>
                        <th>@lang('orders.City')</th>
                        <th width="160">@lang('orders.Date')</th>
                        <th width="140">@lang('orders.Store order id')</th>
                        <th width="110">@lang('orders.QTY Total')</th>
                        <th width="110">@lang('orders.Order Total')</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($orders as $order)
                        {{--<tr onclick="javascript:location.href='/marketplaces/{{ $order->id }}'">--}}
                        <tr>
                            <td>{{ $order->order_number }}</td>
                            <td><span class="table_label    {{ $order->getStatusLabel() }}">{{ $order->getStatus() }}</span></td>
                            <td>
                                <a href="/marketplaces/{{$order->marketplace->id}}">
                                    <div class="avatar" style="background:url('/images/entities/{{$order->marketplace->entity}}.png') center center no-repeat; background-size:cover;"></div>
                                    {{ $order->marketplace->name }}
                                </a>
                            </td>
                            <td>{{ $order->customer->lastname }}</td>
                            <td>{{ $order->customer->zipcode }}</td>
                            <td>{{ $order->customer->city }}</td>
                            <td>{{ $order->order_date }}</td>
                            <td>{{ $order->store_order_id  }}</td>
                            <td>{{ $order->getProductsTotal() }}</td>
                            <td>{{ $order->getOrderTotal() }}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
                <div class="table-footer">
                    <div class="totals">
                        @lang('general.Total'): {{$orders->toArray()['from']}}-{{$orders->toArray()['to']}} @lang('general.of') {{  $orders->total() }}
                    </div>
                    <div class="pager">
                        {{ $orders->links() }}
                    </div>
                </div>

            </div>
        </div>{{--Row--}}
    </div>{{--Container--}}
@endsection
