@extends('layouts.app')

@section('page_title', 'Account')
@section('page_sub_title', trans('account_settings.Account settings'))
@include('accounts.components.sub_header')

@section('content')
    <div class="container">
        <div class="row">
            <div class="panel small-panel paddingtop">
                <div class="panel-header">
                    {{$account->name}}
                </div>
                <div class="panel-body"></div>

            </div>
        </div>
    </div>
@endsection
