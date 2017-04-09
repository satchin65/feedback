@extends('layouts.app')

@section('titlebar_title')
    <div class="avatar" ><i class="icon-store"></i></div>
    <h1>Marketplaces</h1>
    <p>API connections to external marketplaces</p>
@endsection

@section('titlebar_action')
    <nav id="actionset">
        <a href="/marketplaces/create" class="btn btn-primary"><i class="glyphicon glyphicon-plus"></i> @lang('marketplaces.Add marketplace')</a>
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
                            <th>@lang('general.Name')</th>
                            <th>@lang('marketplaces.Marketplace')</th>
                            <th>@lang('general.Products')</th>
                            <th>@lang('general.Errors')</th>
                            <th>@lang('general.Active')</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($marketplaces as $marketplace)
                            <tr onclick="javascript:location.href='/marketplaces/{{ $marketplace->id }}'">
                                <td><div class="avatar" style="background:url('/images/entities/{{$marketplace->entity}}.png') center center no-repeat; background-size:cover;"></div>{{ $marketplace->name }}</td>
                                <td>{{ $marketplace->entity }}</td>
                                <td>{{ $marketplace->processedProducts()->count() }}</td>
                                <td>{{ $marketplace->processedProducts()->where('status','error')->count() }}</td>
                                <td>@if($marketplace->active) <i class="glyphicon glyphicon-ok"></i> @else <i class="glyphicon glyphicon-remove"></i> @endif </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <div class="table-footer">
                    <div class="totals">
                        @lang('general.Total'): {{$marketplaces->toArray()['from']}}-{{$marketplaces->toArray()['to']}} @lang('general.of') {{  $marketplaces->total() }}
                    </div>
                    <div class="pager">
                        {{ $marketplaces->links() }}
                    </div>
                </div>

            </div>
        </div>{{--Row--}}
    </div>{{--Container--}}
@endsection
