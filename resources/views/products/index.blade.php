@extends('layouts.app')


@section('titlebar_title')
    <div class="avatar" ><i class="icon-basket"></i></div>
    <h1>Products</h1>
    <p>All products that have been synced with FeedStack</p>
@endsection

@section('titlebar_action')
    <nav id="actionset">
        <a href="/connections/create" class="btn btn-primary"><i class="glyphicon glyphicon-plus"></i> @lang('products.Add Connections')</a>
    </nav>
@endsection




@section('content')

    @include('components.titlebar')


    <div class="container">
        <div class="row">
            <div class="panel panel-basic nopadding">
                <table>
                    <thead>
                    <tr>
                        <th class="a-center">#</th>
                        <th>@lang('general.Image')</th>
                        <th>@lang('general.Name')</th>
                        <th>@lang('general.Url')</th>
                        <th>@lang('general.Stock')</th>
                        <th>@lang('general.Price')</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($products as $product)
                        <tr onClick="location.href='/products/{{$product->id}}'">
                            <td class="a-center">{{ $product->id }}</td>
                            <td>
                                <img src="{{ $product->image_link }}" class="small-img" width="30" alt="{{ $product->name }}"></td>
                            <td>{{ $product->name }}</td>
                            <td>{{ $product->url }}</td>
                            <td>{{ $product->stock }}</td>
                            <td>&euro; {{ number_format($product->price,2) }}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
                <div class="table-footer">
                    <div class="totals">
                        @lang('general.Total'): {{$products->toArray()['from']}}-{{$products->toArray()['to']}} @lang('general.of') {{  $products->total() }}
                    </div>
                    <div class="pager">
                        {{ $products->links() }}
                    </div>
                </div>
            </div>
        </div>{{--Row--}}
    </div>{{--Container--}}
@endsection
