@extends('layouts.app')

@section('content')

    @include('feeds.components.titlebar_base')
    @include('components.titlebar')

    <div class="container">
        <div class="flexrow">
            <div class="stat_top_block panel-basic clickable success @if($status == 'success') active @endif" onclick="window.location='/feeds/{{$feed->id}}/preview/success'">
                <div class="title">@lang('marketplaces.Products synchronized')</div>
                <div class="numeric">@if($success == 0) 0% @else {{round(($success/$total)*100,2)}}% @endif @if($feed->processing_products) <span class="status"><i class="glyphicon glyphicon-refresh-spin"></i> processing...</span> @endif</div>
                <div class="statusbar">
                    <span class="bar" style="width:@if($success == 0) @else {{round(($success/$total)*100,2)}}% @endif"></span>
                </div>
                <div class="substat">
                    {{$success}} of {{$total}} Products
                </div>
            </div>

            <div class="stat_top_block panel-basic clickable @if($status == 'error') active @endif error" onclick="window.location='/feeds/{{$feed->id}}/preview/error'">
                <div class="title">@lang('marketplaces.Product errors')</div>
                <div class="numeric">@if($error == 0) 0% @else {{round(($error/$total)*100,2)}}% @endif </div>
                <div class="statusbar">
                    <span class="bar" style="width: @if($error == 0) 0% @else {{round(($error/$total)*100,2)}}% @endif"></span>
                </div>
                <div class="substat">
                    {{$error}} of {{$total}} Products
                </div>
            </div>
        </div>
        <div class="row">
            <div class="panel panel-basic nopadding ">



                <div class="panel-title">
                    <i class="glyphicon glyphicon-cog"></i> {{ $feed->name }} Preview
                </div>
                <div class="panel-content padding">

                        {{ csrf_field() }}

                        <div class="flexform">


                            <div class="form-group">
                                <label for="name">@lang('feeds.Feed'):</label>
                                <input type="text" value="{{env('APP_URL').'/files/'.currentStore()->folder_hash.'/'.$feed->unique_filename.'.xml'}}">
                                @if($feed->processing_products)
                                    <i class="glyphicon glyphicon-refresh-spin"></i> Products are still being processed. Please check back in a minute or so.
                                @endif

                                @if($feed->processing_feed)
                                    <i class="glyphicon glyphicon-refresh-spin"></i> Feed currently generating. Check back in 10 seconds.
                                @endif
                            </div>

                        </div>

                        <div class="flexform codepreview">
                            <pre><code class="xml" >{{
                                                       preg_replace_callback('/^( +)</m', function($a) {
                              return str_repeat(' ',intval(strlen($a[1]) / 2) * 8).'<';
                            }, $xml)
                            }}</code></pre>
                        </div>

                </div>


            </div>
        </div>{{--Row--}}
    </div>{{--Container--}}

@endsection
