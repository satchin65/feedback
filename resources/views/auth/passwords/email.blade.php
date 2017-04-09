@extends('layouts.app')

@section('bodyclass')authentication @endsection
@section('page_title') Forgot password @endsection
<!-- Main Content -->
@section('content')

    <div class="loginscreen">
        <div class="auth_logo">
            <img src="/images/logo.svg" width="240" alt="FeedStack">
        </div>
        <div class="login_box">
        <div class="padding-content">




                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form class="form-horizontal" role="form" method="POST" action="{{ url('/password/email') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>

                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Send Password Reset Link
                                </button>
                            </div>
                        </div>
                    </form>
            </div>{{--Padding content--}}
            <div class="box-footer">
                <a class="btn btn-gray" href="{{ url('/login') }}">
                    @lang('auth.Back to Login')
                </a>
            </div>
            </form>
        </div>{{--Login box--}}
    </div>
@endsection
