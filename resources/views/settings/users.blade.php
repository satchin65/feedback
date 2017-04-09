@extends('layouts.app')

@section('content')

    @include('settings.components.titlebar_base')
    @include('components.titlebar')


    <div class="container">
        <div class="row">
            <div class="panel panel-basic nopadding">

                <table>
                    <thead>
                    <tr>
                        <th width="40"></th>
                        <th>@lang('settings.Firstname')</th>
                        <th>@lang('settings.Lastname')</th>
                        <th>@lang('settings.Email')</th>
                        <th>@lang('settings.Role')</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($users as $user)
                        {{--<tr onclick="javascript:location.href='/marketplaces/{{ $marketplace->id }}'">--}}
                        <tr>
                            <td><div class="avatar" style="background:url('{{Auth::user()->getAvatar()}}') center center no-repeat; background-size:cover;"></div></td>
                            <td>{{ $user->firstname }}</td>
                            <td>{{ $user->lastname  }}</td>
                            <td>{{ $user->email }}</td>
                            <td>{{ trans('settings.'.$user->getCurrentAccountRole(currentAccount())) }}</td>
                        </tr>
                    @endforeach

                    @foreach($invites as $invite)
                        {{--<tr onclick="javascript:location.href='/marketplaces/{{ $marketplace->id }}'">--}}
                        <tr class="invited">
                            <td><div class="avatar" style="background:#eee; background-size:cover;"></div></td>
                            <td>{{ $invite->firstname }}</td>
                            <td>{{ $invite->lastname  }}</td>
                            <td>{{ $invite->email }}</td>
                            <td>Invited</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
                <div class="table-footer">
                    <div class="totals">
                        @lang('general.Total'): {{$users->toArray()['from']}}-{{$users->toArray()['to']}} @lang('general.of') {{  $users->total() }}
                    </div>
                    <div class="pager">
                        {{ $users->links() }}
                    </div>
                </div>

            </div>

        </div>{{--Row--}}
        @if(Auth::user()->isAdmin())
        <inviteuser firstnamelabel="@lang('settings.Firstname')"
                    lastnamelabel="@lang('settings.Lastname')"
                    emaillabel="@lang('settings.E-mail')"
                    levellabel="@lang('settings.User role')"
                    csrf="{{ csrf_token() }}"></inviteuser>
        @endif
    </div>{{--Container--}}


@endsection
