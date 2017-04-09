@extends('layouts.app')

@section('content')

    @include('admin.accounts.components.titlebar_base')
    @include('components.titlebar')

    <div class="container">
        <div class="row">
            <div class="panel panel-basic nopadding">

                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>created_at</th>
                        <th>language</th>
                        <th>city</th>
                        <th>country</th>
                        <th>active</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($accounts as $account)
                        {{--<tr onclick="javascript:location.href='/marketplaces/{{ $order->id }}'">--}}
                        <tr>
                            <td>{{ $account->id }}</td>
                            <td>{{ $account->name }}</td>
                            <td>{{ $account->created_at }}</td>
                            <td>{{ $account->language }}</td>
                            <td>{{ $account->city }}</td>
                            <td>{{ $account->country }}</td>
                            <td>{{ $account->active }}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
                <div class="table-footer">
                    <div class="totals">
                        @lang('general.Total'): {{$accounts->toArray()['from']}}-{{$accounts->toArray()['to']}} @lang('general.of') {{  $accounts->total() }}
                    </div>
                    <div class="pager">
                        {{ $accounts->links() }}
                    </div>
                </div>

            </div>
        </div>{{--Row--}}
    </div>{{--Container--}}
@endsection
