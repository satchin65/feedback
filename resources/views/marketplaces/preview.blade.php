@extends('layouts.app')

@section('content')

    @include('marketplaces.components.titlebar_base')
    @include('components.titlebar')


    <div class="container maxed">
        <div class="flexrow">

            <div class="stat_top_block panel-basic clickable success @if($status == 'success') active @endif" onclick="window.location='/marketplaces/{{$marketplace->id}}/preview/success'">
                <div class="title">@lang('marketplaces.Products synchronized')</div>
                <div class="numeric">{{round(($success/$total)*100,2)}}%</div>
                <div class="statusbar">
                    <span class="bar" style="width:{{round(($success/$total)*100,2)}}%"></span>
                </div>
                <div class="substat">
                    {{$success}} of {{$total}} Products
                </div>
            </div>

            <div class="stat_top_block panel-basic clickable @if($status == 'error') active @endif error" onclick="window.location='/marketplaces/{{$marketplace->id}}/preview/error'">
                <div class="title">@lang('marketplaces.Product errors')</div>
                <div class="numeric">{{round(($error/$total)*100,2)}}%</div>
                <div class="statusbar">
                    <span class="bar" style="width:{{round(($error/$total)*100,2)}}%"></span>
                </div>
                <div class="substat">
                    {{$error}} of {{$total}} Products
                </div>
            </div>

          {{--  <div class="stat_top_block panel-basic error">
                <div class="title">@lang('marketplaces.Products synchronized')</div>
                <div class="numeric">48.45%</div>
                <div class="statusbar">
                    <span class="bar" style="width:48.45%"></span>
                </div>
                <div class="substat">
                    {{$success}} of 3199 Products
                </div>
            </div>

            <div class="stat_top_block panel-basic info">
                <div class="title">@lang('marketplaces.Products synchronized')</div>
                <div class="numeric">48.45%</div>
                <div class="statusbar">
                    <span class="bar" style="width:48.45%"></span>
                </div>
                <div class="substat">
                    {{$success}} of 3199 Products
                </div>
            </div>--}}


        </div>
        <div class="row">
            <div class="panel panel-basic nopadding">
                <table>
                    <thead>
                    <tr>
                        <th>@lang('general.Reference')</th>
                        <th>@lang('general.EAN')</th>
                        <th>@lang('general.Name')</th>
                        <th>@lang('general.Status')</th>
                        <th>@lang('general.Stock')</th>
                        <th>@lang('general.Price')</th>
                    </tr>
                    </thead>
                    <tbody>
                        @foreach($products as $product)
                            <tr>
                                <td>{{ $product->reference }}</td>
                                <td>{{ json_decode($product->payload,true)['ean'] }}</td>
                                <td>
                                    {{ json_decode($product->payload,true)['title'] }}
                                    @if($status == 'error')
                                        <Br/>   <span class="small">{{$product->logs()->orderBy('id','DESC')->first()->description}}</span>
                                    @endif
                                </td>
                                <td><span class="table_label label_{{$product->status}}">{{ $product->status }}</span></td>
                                <td>{{ $product->stock }}</td>
                                <td>&euro; {{ number_format($product['price'],2) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <div class="table-footer">
                    <div class="pager">
                        {{ $products->links() }}
                    </div>
                </div>
            </div>
        </div>{{--Row--}}
    </div>{{--Container--}}
@endsection
