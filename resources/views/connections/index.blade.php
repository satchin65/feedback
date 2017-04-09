@extends('layouts.app')

@section('content')

    @include('connections.components.titlebar_base')
    @include('components.titlebar')


    <div class="container">
        <div class="row">
            <div class="panel panel-basic nopadding">

                <table>
                    <thead>
                        <tr>
                            <th width="20" class="a-center">#</th>
                            <th width="250" style="max-width:100px;">@lang('general.Name')</th>
                            <th>@lang('general.Url')</th>
                            <th width="120">@lang('general.Type')</th>
                            <th width="80" class="a-center">@lang('general.Active')</th>
                            <th width="80"  class="a-center">@lang('general.Products')</th>
                            <th class="a-right" width="250">@lang('general.Actions')</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($connections as $connection)
                            <tr>
                                <td class="a-center">{{ $connection->id }}</td>
                                <td>{{ $connection->name }}</td>
                                <td>
                                    <input value="{{ $connection->feed_url }}" type="text" style="max-width:95%;">
                                </td>
                                <td>
                                    <div class="avatar" style="background:url('/images/entities/Connection{{$connection->connection_type->name}}.png') center center no-repeat; background-size:cover;"></div>
                                    {{ $connection->connection_type->name }}
                                </td>
                                <td class="a-center">@if($connection->active) <i class="glyphicon glyphicon-ok"></i> @else <i class="glyphicon glyphicon-remove"></i> @endif </td>
                                <td class="a-center">{{ $connection->product_count }}</td>
                                <td class="a-right">
                                    <a href="/connections/{{ $connection->id }}" class="btn btn-gray btn-small"><i class="glyphicon glyphicon-pencil"></i> @lang('general.edit')</a>
                                    {{--<a href="/connections/{{ $connection->id }}/mapping" class="btn btn-gray btn-small"><i class="glyphicon glyphicon-random"></i> @lang('general.mapping')</a>--}}
                                    <productimportrun
                                            id="{{$connection->id}}"
                                            running="{{ $connection->scheduled || $connection->running ? true : false }}"
                                            inactive="{{! $connection->active ? true : false }}"></productimportrun>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <div class="table-footer">
                    <div class="totals">
                        @lang('general.Total'): {{$connections->toArray()['from']}}-{{$connections->toArray()['to']}} @lang('general.of') {{  $connections->total() }}
                    </div>
                    <div class="pager">
                        {{ $connections->links() }}
                    </div>
                </div>
            </div>
        </div>{{--Row--}}
    </div>{{--Container--}}
@endsection
