@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="panel panel-basic small-panel storeselector nopadding">
                <div class="content-title">
                    <h2 class="a-center">@lang('stores.Select store')</h2>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th class="a-center">#</th>
                        <th>@lang('general.Name')</th>
                        <th width="120">@lang('general.Products')</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($stores as $store)
                        <tr class="hoverclick" onclick="window.location = '/stores/choose/{{$store->id}}';">
                            <td class="a-center">{{ $store->id }}</td>
                            <td>{{ $store->name }}</td>
                            <td>{{ number_format($store->products()->count(),0,',',' ') }}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
                <div class="content-footer a-center">
                    <a href="/stores/create" class="btn btn-primary"> @lang('stores.Add new store')</a>
                </div>
            </div>
        </div>
    </div>
@endsection
