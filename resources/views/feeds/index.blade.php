@extends('layouts.app')

@section('titlebar_title')
    <div class="avatar" ><i class="icon-feed"></i></div>
    <h1>Feeds</h1>
    <p>Product feeds</p>
@endsection

@section('titlebar_action')
    <nav id="actionset">
        <a href="/feeds/create" class="btn btn-primary"><i class="glyphicon glyphicon-plus"></i> @lang('feeds.Add feed')</a>
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
                            <th>@lang('feeds.Feed')</th>
                            <th>@lang('general.Products')</th>
                            <th>@lang('general.Errors')</th>
                            <th>@lang('general.Active')</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($feeds as $feed)
                            <tr onclick="javascript:location.href='/feeds/{{ $feed->id }}'">
                                <td><div class="avatar" style="background:url('/images/entities/{{$feed->entity}}.png') center center no-repeat; background-size:cover;"></div>{{ $feed->name }}</td>
                                <td>{{ $feed->entity }}</td>
                                <td></td>
                                <td></td>
                                <td>@if($feed->active) <i class="glyphicon glyphicon-ok"></i> @else <i class="glyphicon glyphicon-remove"></i> @endif </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <div class="table-footer">
                    <div class="totals">
                        @lang('general.Total'): {{$feeds->toArray()['from']}}-{{$feeds->toArray()['to']}} @lang('general.of') {{  $feeds->total() }}
                    </div>
                    <div class="pager">
                        {{ $feeds->links() }}
                    </div>
                </div>

            </div>
        </div>{{--Row--}}
    </div>{{--Container--}}
@endsection
