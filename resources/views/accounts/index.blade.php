@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="panel small-panel paddingtop">
                <div class="account-row add-new-account">
                    {{--<div class="avatar">
                        <div class="avatar-placeholder"></div>
                    </div>--}}
                    <div class="account-name">
                        <span><i class="glyphicon glyphicon-plus"></i> Create new account</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="panel small-panel">
                @foreach($accounts as $account)
                    <div class="account-row" onclick=" window.location = '/accounts/choose/{{$account->id}}'; ">
                        <div class="avatar">
                            <div class="avatar-placeholder"></div>
                        </div>
                        <div class="account-name">
                            <span>{{$account->name}}</span>
                            last login: {{$account->updated_at}}
                        </div>
                    </div>
                @endforeach

            </div>
        </div>
    </div>
@endsection
