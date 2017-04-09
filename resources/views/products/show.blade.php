@extends('layouts.app')

@section('content')

    <div class="container">
        <div class="row">
            <div class="panel panel-basic nopadding">
                <div class="content-title">
                    <h2>@lang('products.Products')</h2>
                </div>

                <div class="head">
                    <img src="{{$product->image_link}}" alt="{{$product->name}}">
                    <h1>{{$product->name}}</h1>
                    {{$product->description}}
                </div>
                <div class="table-footer">

                </div>
            </div>
        </div>{{--Row--}}
    </div>{{--Container--}}
@endsection
