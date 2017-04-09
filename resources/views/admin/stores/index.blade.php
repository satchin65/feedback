@extends('layouts.app')

@section('content')

    @include('admin.stores.components.titlebar_base')
    @include('components.titlebar')

    <div class="container">
        <div class="row">
            <div class="panel panel-basic nopadding">

                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>Products</th>
                        <th>Url</th>
                        <th>Account</th>
                        <th>Created at</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($stores as $store)
                        {{--<tr onclick="javascript:location.href='/marketplaces/{{ $order->id }}'">--}}
                        <tr>
                            <td>{{ $store->id }}</td>
                            <td>{{ $store->name }}</td>
                            <td>{{ $store->products()->count() }}</td>
                            <td>{{ $store->url}}</td>
                            <td>{{ $store->account->name }}</td>
                            <td>{{ $store->created_at }}</td>
                            <td><a href="/admin/accounts/{{$store->account->id}}/stores/{{$store->id}}/login" class="btn btn-gray btn-small"><i class="glyphicon glyphicon-log-in"></i> @lang('Login')</a></td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
                <div class="table-footer">
                    <div class="totals">
                        @lang('general.Total'): {{$stores->toArray()['from']}}-{{$stores->toArray()['to']}} @lang('general.of') {{  $stores->total() }}
                    </div>
                    <div class="pager">
                        {{ $stores->links() }}
                    </div>
                </div>

            </div>
        </div>{{--Row--}}
    </div>{{--Container--}}
@endsection
