@extends('layouts.app')

@section('content')


@section('titlebar_title')
    <div class="avatar"><i class="icon-gear"></i></div>
    <h1>@lang('settings.Account settings')</h1>
    <p>@lang('settings.Fill-out this information to complete your profile and billing information.')</p>
@endsection


    @include('settings.components.titlebar_base')
    @include('components.titlebar')




    <form action="" method="POST">
        {{csrf_field()}}
        <div class="container settings">
            <div class="row">

                <div class="panel panel-basic nopadding maxwidth">
                    <div class="panel-title">
                        @lang('settings.Account settings')
                    </div>
                    <div class="panel-content padding">
                        <p class="description">
                            @lang('settings.Fill-out this information to complete your profile and billing information.')
                        </p>

                        <div class="flexform">
                            <div class="form-group">
                                <label for="name">@lang('settings.Company name'):</label>
                                <input placeholder="@lang('settings.Company name')" type="text" name="name" required @if($errors->has('name')) class="error" @endif @if(!$account->name) value="{{old('name')}}" @else value="{{$account->name}}" @endif>
                                @if($errors->has('name')) <span class="error">{{$errors->first('name')}}</span> @endif
                            </div>

                            <div class="form-group">
                                <label for="language">@lang('settings.Language'):</label>
                                <select name="language" id="">
                                    <option value="nl">@lang('settings.Dutch')</option>
                                    <option value="en">@lang('settings.English')</option>
                                </select>
                            </div>
                        </div>


                        <hr>


                        <div class="form-group">
                            <label for="address">@lang('settings.Address'):</label>
                            <div class="flexform">
                                <div>
                                    <input placeholder="@lang('settings.Address')" type="text" name="address" required @if($errors->has('address')) class="error" @endif @if(!$account->address) value="{{old('address')}}" @else value="{{$account->address}}" @endif>
                                    @if($errors->has('address')) <span class="error">{{$errors->first('address')}}</span> @endif
                                </div>

                                <div>
                                    <input placeholder="@lang('settings.Additional address')"  type="text" name="address2" @if($errors->has('address2')) class="error" @endif @if(!$account->address2) value="{{old('address2')}}" @else value="{{$account->address2}}" @endif>
                                    @if($errors->has('address2')) <span class="error">{{$errors->first('address2')}}</span> @endif
                                </div>
                            </div>
                            @if($errors->has('name')) <span class="error">{{$errors->first('name')}}</span> @endif
                        </div>

                        <div class="flexform">
                            <div class="form-group">
                                <label for="zipcode">@lang('settings.Zipcode'):</label>
                                <input placeholder="@lang('settings.Zipcode')" type="text" name="zipcode"  @if($errors->has('zipcode')) class="error" @endif @if(!$account->zipcode) value="{{old('zipcode')}}" @else value="{{$account->zipcode}}" @endif>
                                @if($errors->has('zipcode')) <span class="error">{{$errors->first('zipcode')}}</span> @endif
                            </div>

                            <div class="form-group">
                                <label for="zipcode">@lang('settings.City'):</label>
                                <input placeholder="@lang('settings.City')" type="text" name="city"  @if($errors->has('city')) class="error" @endif @if(!$account->city) value="{{old('city')}}" @else value="{{$account->city}}" @endif>
                                @if($errors->has('city')) <span class="error">{{$errors->first('city')}}</span> @endif
                            </div>
                        </div>

                        <div class="flexform">
                            <div class="form-group">
                                <label for="country">@lang('settings.Country'):</label>
                                <select name="country" id="">
                                    <option value="nl">@lang('settings.Netherlands')</option>
                                    <option value="en">@lang('settings.United Kingdom')</option>
                                    <option value="de">@lang('settings.Germany')</option>
                                    <option value="be">@lang('settings.Belgium')</option>
                                    <option value="fr">@lang('settings.France')</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="tax_id">@lang('settings.Tax ID'):</label>
                                <input placeholder="@lang('settings.Tax ID')" type="text" name="tax_id"  @if($errors->has('tax_id')) class="error" @endif @if(!$account->tax_id) value="{{old('tax_id')}}" @else value="{{$account->tax_id}}" @endif>
                                @if($errors->has('tax_id')) <span class="error">{{$errors->first('tax_id')}}</span> @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="email">@lang('settings.Company e-mail'):</label>
                            <input placeholder="@lang('settings.Company e-mail')" type="text" name="email"  @if($errors->has('email')) class="error" @endif @if(!$account->email) value="{{old('email')}}" @else value="{{$account->email}}" @endif>
                            @if($errors->has('email')) <span class="error">{{$errors->first('email')}}</span> @endif
                        </div>
                    </div>
                </div>
                <input type="submit" class="btn btn-primary" value="@lang('settings.Save account settings')">




            </div>{{--Row--}}
        </div>{{--Container--}}


    </form>



@endsection
