@extends('layouts.app')

@section('bodyclass')authentication @endsection
@section('page_title') Login or signup @endsection

@section('content')


    
    <div class="loginscreen">
        <div class="auth_logo">
            <img src="/images/logo.svg" width="240" alt="FeedStack">
        </div>
        <div class="login_box">
            <div class="padding-content">
                <form class="form-horizontal" role="form" method="POST" action="{{ url('/login') }}">
                    {{ csrf_field() }}

                    <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">

                        <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}"  autofocus placeholder="E-mail" required>

                        @if ($errors->has('email'))
                            <span class="help-block">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                        @endif

                    </div>

                    <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">

                        <input id="password" type="password" class="form-control" name="password" placeholder="Password" required>

                        @if ($errors->has('password'))
                            <span class="help-block">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                        @endif

                    </div>



                    <div class="form-group">

                        <button type="submit" class="btn btn-primary">
                            Login
                        </button>
                    </div>
                    <div class="form-group">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" name="remember"> Remember Me
                            </label>
                        </div>
                    </div>
                </div>{{--Padding content--}}
                <div class="box-footer">
                    <a class="btn btn-gray" href="{{ url('/register') }}">
                        Create new account
                    </a>
                </div>
            </form>
        </div>{{--Login box--}}
        <a class="forgot-password small gray" href="{{ url('/password/reset') }}">
            @lang('auth.Forgot Your Password?')
        </a>
    </div>
@endsection
