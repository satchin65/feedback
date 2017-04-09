@extends('layouts.app')

@section('content')

    @include('connections.components.titlebar_base')
    @include('components.titlebar')

    <div class="container">
        <div class="row">
            <div class="panel panel-basic">

                    @if($connection->id)
                        <form action="/connections/{{$connection->id}}" method="post">
                    @else
                        <form action="/connections/{{$connection->id}}" method="post">
                    @endif
                        {{ csrf_field() }}
                        <div class="form-control">

                            <div class="form-group">
                                <label for="name">@lang('connections.Connection type'):</label>
                                XML Feed
                            </div>

                            @include('components.form_input',[ 'label' => 'Connection name', 'name' => 'name', 'value' => $connection->name])
                            @include('components.form_input',[ 'label' => 'Feed URL', 'name' => 'feed_url', 'value' => $connection->feed_url])

                            {{--$label $name $value--}}
                            <div class="form-group">
                                <label for="name">@lang('settings.Import frequency'):</label>
                                <select name="frequency" class="frequency">
                                    <option value="Daily" selected disabled>@lang('settings.Daily')</option>
                                </select>
                                <select name="hour" id="" class="frequency_hour">
                                    <option value="00" @if(!$connection->hour || $connection->hour == '00') selected @endif>00</option>
                                    <option value="01" @if($connection->hour == '01') selected @endif>01</option>
                                    <option value="02" @if($connection->hour == '02') selected @endif>02</option>
                                    <option value="03" @if($connection->hour == '03') selected @endif>03</option>
                                    <option value="04" @if($connection->hour == '04') selected @endif>04</option>
                                    <option value="05" @if($connection->hour == '05') selected @endif>05</option>
                                    <option value="06" @if($connection->hour == '06') selected @endif>06</option>
                                    <option value="07" @if($connection->hour == '07') selected @endif>07</option>
                                    <option value="08" @if($connection->hour == '08') selected @endif>08</option>
                                    <option value="09" @if($connection->hour == '09') selected @endif>09</option>
                                    <option value="10" @if($connection->hour == '10') selected @endif>10</option>
                                    <option value="11" @if($connection->hour == '11') selected @endif>11</option>
                                    <option value="12" @if($connection->hour == '11') selected @endif>12</option>
                                    <option value="13" @if($connection->hour == '11') selected @endif>13</option>
                                    <option value="14" @if($connection->hour == '11') selected @endif>14</option>
                                    <option value="15" @if($connection->hour == '11') selected @endif>15</option>
                                    <option value="16" @if($connection->hour == '11') selected @endif>16</option>
                                    <option value="17" @if($connection->hour == '11') selected @endif>17</option>
                                    <option value="18" @if($connection->hour == '11') selected @endif>18</option>
                                    <option value="19" @if($connection->hour == '11') selected @endif>19</option>
                                    <option value="20" @if($connection->hour == '11') selected @endif>20</option>
                                    <option value="21" @if($connection->hour == '11') selected @endif>21</option>
                                    <option value="22" @if($connection->hour == '11') selected @endif>22</option>
                                    <option value="23" @if($connection->hour == '11') selected @endif>23</option>
                                </select>
                                <select name="minute" id="" class="frequency_minute">
                                    <option value="00" selected disabled>
                                        <option value="00" @if(!$connection->minute || $connection->minute == '00') selected @endif>00</option>
                                        <option value="05" @if($connection->minute == '05') selected @endif>05</option>
                                        <option value="10" @if($connection->minute == '10') selected @endif>10</option>
                                        <option value="15" @if($connection->minute == '15') selected @endif>15</option>
                                        <option value="20" @if($connection->minute == '20') selected @endif>20</option>
                                        <option value="25" @if($connection->minute == '25') selected @endif>25</option>
                                        <option value="30" @if($connection->minute == '30') selected @endif>30</option>
                                        <option value="35" @if($connection->minute == '35') selected @endif>35</option>
                                        <option value="40" @if($connection->minute == '40') selected @endif>40</option>
                                        <option value="45" @if($connection->minute == '45') selected @endif>45</option>
                                        <option value="50" @if($connection->minute == '50') selected @endif>50</option>
                                        <option value="55" @if($connection->minute == '55') selected @endif>55</option>
                                    </option>
                                </select>
                            </div>

                            @if($connection->scheduled_at)
                                <div class="form-group">
                                    <label for="name">@lang('settings.Next scheduled import'):</label>
                                    <input type="text" name="scheduled_at_disabled" value="{{ $connection->scheduled_at }}" disabled>
                                </div>
                            @endif


                            @if($connection->name)
                                <div class="form-group">
                                    <label for="name">@lang('settings.Active'):</label>
                                    <input type="checkbox" name="active" value="1" @if($connection->mappings()->count()<1) disabled @else @if($connection->active) checked @endif @endif >
                                </div>
                            @endif

                            <div class="button-set">
                                @if($connection->name)
                                    <button type="submit" class="btn btn-primary btn-small">@if($connection->mappings()->count()<1) @lang('connections.Go to mapping') @else @lang('general.Save') @endif</button>
                                    <a href="/connections/{{$connection->id}}/delete" class="btn btn-gray btn-small">@lang('general.Delete')</a>
                                @else
                                    <button type="submit" class="btn btn-primary btn-small">@lang('connections.Add Connection')</button>
                                @endif
                            </div>
                        </div>
                    </form>


            </div>
        </div>{{--Row--}}
    </div>{{--Container--}}
@endsection
