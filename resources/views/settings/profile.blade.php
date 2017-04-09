@extends('layouts.app')

@section('content')

@section('titlebar_title')
    <div class="avatar"><i class="icon-gear"></i></div>
    <h1>@lang('settings.Profile settings')</h1>
    <p>@lang('settings.You\'re personal profile settings')</p>
@endsection


    @include('settings.components.titlebar_base')
    @include('components.titlebar')




    <form action="" method="POST">
        {{csrf_field()}}
        <div class="container settings">
            <div class="row">

                <div class="panel panel-basic nopadding maxwidth">
                    <div class="panel-title">
                        @lang('settings.Profile settings')
                    </div>
                    <div class="panel-content padding">
                        <p class="description">
                            @lang('settings.You\'re personal profile settings')
                        </p>

                        <div class="flexform">
                            <div class="form-group">
                                <label for="name">@lang('settings.Firstname'):</label>
                                <input type="text" name="firstname" required @if($errors->has('firstname')) class="error" @endif @if(!$user->firstname) value="{{old('firstname')}}" @else value="{{$user->firstname}}" @endif>
                                @if($errors->has('firstname')) <span class="error">{{$errors->first('firstname')}}</span> @endif
                            </div>

                            <div class="form-group">
                                <label for="lastname">@lang('settings.Lastname'):</label>
                                <input type="text" name="lastname" required @if($errors->has('lastname')) class="error" @endif @if(!$user->lastname) value="{{old('lastname')}}" @else value="{{$user->lastname}}" @endif>
                                @if($errors->has('lastname')) <span class="error">{{$errors->first('lastname')}}</span> @endif
                            </div>
                        </div>

                        <div class="flexform">
                            <div class="form-group">
                                <label for="phone">@lang('settings.Phone'):</label>
                                <input type="text" name="phone" required @if($errors->has('phone')) class="error" @endif @if(!$user->phone) value="{{old('phone')}}" @else value="{{$user->phone}}" @endif>
                                @if($errors->has('phone')) <span class="error">{{$errors->first('phone')}}</span> @endif
                            </div>

                            <div class="form-group">
                                <label for="email">@lang('settings.E-mail'):</label>
                                <input type="text" name="email" required @if($errors->has('email')) class="error" @endif @if(!$user->email) value="{{old('email')}}" @else value="{{$user->email}}" @endif>
                                @if($errors->has('email')) <span class="error">{{$errors->first('email')}}</span> @endif
                                <span class="error">@lang('settings.Not confirmed') <a href="/settings/profile/resend_email_confirmation">@lang('settings.Resend confirmation email')</a></span>

                            </div>
                        </div>


                        <hr>

                        <p class="description">
                            @lang('settings.Change your password by filling in both fields. If you do not want to change you password, keep these fields empty.')
                        </p>


                        <div class="form-group">
                            <label for="password">@lang('settings.Change password'):</label>
                            <div class="flexform">
                                <div>
                                    <input type="password" name="password" placeholder="@lang('settings.New password')">
                                    @if($errors->has('password')) <span class="error">{{$errors->first('password')}}</span> @endif
                                </div>
                                <div>
                                    <input type="password" name="password_confirm" placeholder="@lang('settings.Confirm new password')">
                                    @if($errors->has('password_confirm')) <span class="error">{{$errors->first('password_confirm')}}</span> @endif
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <input type="submit" class="btn btn-primary" value="@lang('settings.Save profile settings')">

            </div>{{--Row--}}
        </div>{{--Container--}}


    </form>



@endsection
