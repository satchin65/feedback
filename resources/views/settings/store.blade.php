@extends('layouts.app')

@section('content')

    @include('settings.components.titlebar_base')
    @include('components.titlebar')




    <form action="" method="POST">
        {{csrf_field()}}
        <div class="container settings">
            <div class="row">

                <div class="panel panel-basic nopadding maxwidth">
                    <div class="panel-title">
                        @lang('settings.Store settings')
                    </div>
                    <div class="panel-content padding">
                        <p class="description">
                            @lang('settings.Basic store information.')
                        </p>

                        <div class="flexform">
                            <div class="form-group">
                                <label for="name">@lang('settings.Store name'):</label>
                                <input placeholder="@lang('settings.Store name')" type="text" name="name" required @if($errors->has('name')) class="error" @endif @if(!$store->name) value="{{old('name')}}" @else value="{{$store->name}}" @endif>
                                @if($errors->has('name')) <span class="error">{{$errors->first('name')}}</span> @endif
                            </div>

                            <div class="form-group">
                                <label for="language">@lang('settings.Store URL'):</label>
                                <input placeholder="@lang('settings.Store URL')" type="text" name="url" required @if($errors->has('url')) class="error" @endif @if(!$store->url) value="{{old('url')}}" @else value="{{$store->url}}" @endif>
                                @if($errors->has('url')) <span class="error">{{$errors->first('url')}}</span> @endif
                            </div>
                        </div>

                        <hr>

                        <p class="description">
                            @lang('settings.Default schedule information. This can also be configured from a connection specificly.')
                        </p>

                        <div class="form-group">
                            <label for="address">@lang('settings.Schedule information'):</label>
                            <div class="flexform">
                                <div>
                                    <select name="schedule_frequency" id="">
                                        <option value="daily" checked>Daily</option>
                                    </select>
                                </div>

                                <div>
                                    <select name="schedule_hour" id="" class="schedule_hours" >
                                            <option value="00" @if(!$store->schedule_hour || $store->schedule_hour == '00') selected @endif>00</option>
                                            <option value="01" @if($store->schedule_hour == '01') selected @endif>01</option>
                                            <option value="02" @if($store->schedule_hour == '02') selected @endif>02</option>
                                            <option value="03" @if($store->schedule_hour == '03') selected @endif>03</option>
                                            <option value="04" @if($store->schedule_hour == '04') selected @endif>04</option>
                                            <option value="05" @if($store->schedule_hour == '05') selected @endif>05</option>
                                            <option value="06" @if($store->schedule_hour == '06') selected @endif>06</option>
                                            <option value="07" @if($store->schedule_hour == '07') selected @endif>07</option>
                                            <option value="08" @if($store->schedule_hour == '08') selected @endif>08</option>
                                            <option value="09" @if($store->schedule_hour == '09') selected @endif>09</option>
                                            <option value="10" @if($store->schedule_hour == '10') selected @endif>10</option>
                                            <option value="11" @if($store->schedule_hour == '11') selected @endif>11</option>
                                            <option value="12" @if($store->schedule_hour == '11') selected @endif>12</option>
                                            <option value="13" @if($store->schedule_hour == '11') selected @endif>13</option>
                                            <option value="14" @if($store->schedule_hour == '11') selected @endif>14</option>
                                            <option value="15" @if($store->schedule_hour == '11') selected @endif>15</option>
                                            <option value="16" @if($store->schedule_hour == '11') selected @endif>16</option>
                                            <option value="17" @if($store->schedule_hour == '11') selected @endif>17</option>
                                            <option value="18" @if($store->schedule_hour == '11') selected @endif>18</option>
                                            <option value="19" @if($store->schedule_hour == '11') selected @endif>19</option>
                                            <option value="20" @if($store->schedule_hour == '11') selected @endif>20</option>
                                            <option value="21" @if($store->schedule_hour == '11') selected @endif>21</option>
                                            <option value="22" @if($store->schedule_hour == '11') selected @endif>22</option>
                                            <option value="23" @if($store->schedule_hour == '11') selected @endif>23</option>
                                    </select>
                                    <select name="schedule_minute" id="" class="schedule_minutes" >
                                        <option value="00" selected disabled>
                                        <option value="00" @if(!$store->schedule_minute || $store->schedule_minute == '00') selected @endif>00</option>
                                        <option value="05" @if($store->schedule_minute == '05') selected @endif>05</option>
                                        <option value="10" @if($store->schedule_minute == '10') selected @endif>10</option>
                                        <option value="15" @if($store->schedule_minute == '15') selected @endif>15</option>
                                        <option value="20" @if($store->schedule_minute == '20') selected @endif>20</option>
                                        <option value="25" @if($store->schedule_minute == '25') selected @endif>25</option>
                                        <option value="30" @if($store->schedule_minute == '30') selected @endif>30</option>
                                        <option value="35" @if($store->schedule_minute == '35') selected @endif>35</option>
                                        <option value="40" @if($store->schedule_minute == '40') selected @endif>40</option>
                                        <option value="45" @if($store->schedule_minute == '45') selected @endif>45</option>
                                        <option value="50" @if($store->schedule_minute == '50') selected @endif>50</option>
                                        <option value="55" @if($store->schedule_minute == '55') selected @endif>55</option>
                                        </option>
                                    </select>
                                </div>
                            </div>
                            @if($errors->has('name')) <span class="error">{{$errors->first('name')}}</span> @endif
                        </div>{{--form group--}}

                        <hr>

                        <p class="description">
                            @lang('settings.These API settings are used to connect from and to your store. Used for importing orders from external marketplaces')
                        </p>

                        <div class="form-group">
                            <label for="name">@lang('settings.API Key'):</label>
                            <input type="text" value="{{ $store->api_key }}" disabled>
                            <span class="status"> @if($store->getApiStatus()) {{$store->getApiStatus()}} @else Not connected @endif </span>
                        </div>


                    </div>
                </div>
                <input type="submit" class="btn btn-primary" value="@lang('settings.Save store settings')">

            </div>{{--Row--}}
        </div>{{--Container--}}


    </form>



@endsection
