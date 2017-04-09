@extends('layouts.app')

@section('content')
    @include('feeds.components.titlebar_base')
    @include('components.titlebar')


    <div class="col2_left">

        <div class="container" id="filtercontainert">
            {{--<form action="" method="POST">--}}
                {{csrf_field()}}


                <div class="row">
                    <div class="panel panel-basic nopadding">
                        <div class="panel-title">
                            Categories
                        </div>
                        <div class="panel-content" id="filtercontent">


                            <feed_categories id="{{$feed->id}}" :fields="{{ json_encode($product_columns) }}" :filters="{{ json_encode($filter_methods) }}" entity="{{$feed->entity}}"></feed_categories>



                        </div>
                    </div>

{{--            </form>--}}
        </div>{{--Row--}}


        
    </div>{{--Container--}}
    </div>



    <style>
        .tabs {
            position: absolute;
            top: -45px;
            height: 45px;
            margin: 0;
            padding: 0;
            overflow: hidden;
            list-style: none;
        }
        .tabs li {
            display: inline-block;
            margin: 0;
        }
        .tabs li a {
            display: inline-block;
            border-radius: 3px 3px 0 0;
            background: none;
            padding: 10px 15px;
            font-weight: 600;
            border-left: 1px solid transparent;
            border-top: 1px solid transparent;
            border-right: 1px solid transparent;
        }
        .tabs li.active a, .tabs li.active a:hover {
            color: #404040;
            border-color: #e8e8e8;
            box-shadow: 1px 5px rgba(0,0,0,0.01);
        }

        #logo {
            background: url(../images/logo@2x.png) 0 0 no-repeat;
            background-size: 153px 35px;
            text-indent: -1000em;
            overflow: hidden;
            display: inline-block;
            height: 35px;
            width: 153px;
        }

        /**
         * Syntax Highlighting
         */

        pre code { width: 1000px; display: block; }
        pre { overflow: auto; width: 100%; }
        pre .string { color: #0d9bff; font-weight: 500; }
        pre .constant, pre .literal, pre .number { color: #fcb01d;}
        pre .keyword { color: #fc611d; font-weight: bold; }

        /**
         * Demos
         */
        .demo {
            margin: 0 0 50px 0;
        }
        .demo > * {
            padding: 15px 0;
        }
        .demo > .header {
            font-size: 20px;
            font-weight: 600;
            padding-top: 0;
            margin-bottom: 10px;
        }
        .demo .sandbox {
            padding: 0;
        }
        .demo select, .demo input, .demo .selectize-control {
            width: 100%;
        }
        .demo > *:first-child {
            margin-top: 0;
        }
        .demo > *:last-child {
            margin-bottom: 0;
        }
        .demo .value {
            margin: 10px 0 0 0;
            font-size: 12px;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .demo .value span {
            font-family: Monaco, "Bitstream Vera Sans Mono", "Lucida Console", Terminal, monospace;
        }

        .inset, .tabs li.active a, .tabs li.active a:hover {
            background: #fff;
        }
        .selectize-control {
            font-weight: normal;
            line-height: 0;
        }

        .inset {
            border-top: 1px solid #e8e8e8;
            border-bottom: 1px solid #e8e8e8;
        }
        .wrapper {
            width: 520px;
            margin: 0 auto;
            text-align: left;
            padding: 40px 0;
        }
        .wrapper > *:last-child {
            margin-bottom: 0;
        }
        pre {
            background: rgba(45,45,45,0.01);
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.06);
            padding: 10px !important;
            font-size: 12px;
            line-height: 15px;
            font-family: Monaco, "Bitstream Vera Sans Mono", "Lucida Console", Terminal, monospace;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
        }
        input[type=button] {
            margin: 0 10px 0 0;
            padding: 6px 10px;
            color: #606060;
            background: #e0e0e0;
            border: 0 none;
            width: auto;
            display: inline-block;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            -webkit-font-smoothing: antialiased;
        }
        .buttons {
            margin: 0 0 25px 0;
        }
        input[type=button]:hover {
            background: #dadada;
        }
        kbd {
            display: inline;
            display: inline-block;
            min-width: 1em;
            padding: .2em .3em;
            font: normal .85em/1 "Open Sans", "Lucida Grande", Lucida, Arial, sans-serif;
            text-align: center;
            text-decoration: none;
            -moz-border-radius: .3em;
            -webkit-border-radius: .3em;
            border-radius: .3em;
            border: none;
            cursor: default;
            -moz-user-select: none;
            -webkit-user-select: none;
            user-select: none;

            background: rgb(250, 250, 250);
            background: -moz-linear-gradient(top, rgb(255, 255, 255), rgb(240, 240, 240));
            background: -webkit-gradient(linear, left top, left bottom, from(rgb(255, 255, 255)), to(rgb(240, 240, 240)));
            color:  rgb(50, 50, 50);
            text-shadow: 0 0 2px rgb(255, 255, 255);
            -moz-box-shadow: inset 0 0 1px rgb(255, 255, 255), 0 .1em 0 rgb(200, 200, 200), 0 .11em 0 rgba(0, 0, 0, .4), 0 .1em .11em rgba(0, 0, 0, .4);
            -webkit-box-shadow: inset 0 0 1px rgb(255, 255, 255), 0 .1em 0 rgb(200, 200, 200), 0 .11em 0 rgba(0, 0, 0, .4), 0 .1em .11em rgba(0, 0, 0, .4);
            box-shadow: inset 0 0 1px rgb(255, 255, 255), 0 .1em 0 rgb(200, 200, 200), 0 .11em 0 rgba(0, 0, 0, .4), 0 .1em .11em rgba(0, 0, 0, .4);
        }

        #theme-selector {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            border-top: 1px solid rgba(80,80,80,0.1);
            background: rgba(255,255,255,0.95);
            padding: 5px 15px;
            z-index: 9999;
            font-weight: normal;
            font-size: 13px;
            -moz-box-shadow: 0 -1px 80px 80px rgba(255,255,255,0.6);
            -webkit-box-shadow: 0 -1px 80px 80px rgba(255,255,255,0.6);
            box-shadow: 0 -1px 80px 80px rgba(255,255,255,0.6);
        }
        #theme-selector .label {
            margin-right: 10px;
        }
        #theme-selector a {
            margin: 0 4px;
        }
        #theme-selector a.active {
            color: #242320;
            font-weight: bold;
        }

        #github-banner {
            height: 149px;
            width: 149px;
            overflow: hidden;
            padding: 0;
            margin: 0;
            position: fixed;
            top: 0;
            right: 0;
            z-index: 99999;
        }

        #github-banner a {
            display: block;
            width: 190px;
            font-size: 14px;
            font-family: Frutiger, "Frutiger Linotype", Univers, Calibri, "Gill Sans", "Gill Sans MT",
            "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma,
            Geneva, "Helvetica Neue", Helvetica, Arial, sans serif;
            background-color: #333;
            color: #FFF;
            word-spacing: 2px;
            text-decoration: none;
            padding: 5px 15px 5px 25px;

            position:relative;
            left: 20px;
            top: -37px;
            text-align: center;

            -moz-transform-origin: 0 0 ;
            -moz-transform:rotate(45deg);
            -moz-box-shadow: 1px 1px 5px 1px #666;

            -webkit-transform-origin: 0 0 ;
            -webkit-transform:rotate(45deg);
            -webkit-box-shadow: 1px 1px 5px 1px #666;

            -ms-transform-origin: 0 0 ;
            -ms-transform:rotate(45deg);
            -ms-box-shadow: 1px 1px 5px 1px #666;

            transform-origin: 0 0 ;
            transform:rotate(45deg);
            box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.2);

            background-image: linear-gradient(bottom, #534E41 3%, #9E9B96 5%, #64625A 7%, #5C5A55 93%, #9E9B96 95%, #534E41 97%);
            background-image: -o-linear-gradient(bottom, #534E41 3%, #9E9B96 5%, #64625A 7%, #5C5A55 93%, #9E9B96 95%, #534E41 97%);
            background-image: -moz-linear-gradient(bottom, #534E41 3%, #9E9B96 5%, #64625A 7%, #5C5A55 93%, #9E9B96 95%, #534E41 97%);
            background-image: -webkit-linear-gradient(bottom, #534E41 3%, #9E9B96 5%, #64625A 7%, #5C5A55 93%, #9E9B96 95%, #534E41 97%);
            background-image: -ms-linear-gradient(bottom, #534E41 3%, #9E9B96 5%, #64625A 7%, #5C5A55 93%, #9E9B96 95%, #534E41 97%);

            background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.03, #534E41), color-stop(0.05, #9E9B96), color-stop(0.07, #64625A), color-stop(0.93, #5C5A55), color-stop(0.95, #9E9B96), color-stop(0.97, #534E41) );;
        }
        /**
         * Github Demo
         */
        .selectize-control.repositories .selectize-dropdown [data-selectable] {
            border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .selectize-control.repositories .selectize-dropdown .by {
            font-size: 11px;
            opacity: 0.8;
        }
        .selectize-control.repositories .selectize-dropdown .by::before {
            content: 'by ';
        }
        .selectize-control.repositories .selectize-dropdown .name {
            font-weight: bold;
            margin-right: 5px;
        }
        .selectize-control.repositories .selectize-dropdown .title {
            display: block;
        }
        .selectize-control.repositories .selectize-dropdown .description {
            font-size: 12px;
            display: block;
            opacity: 0.5;
            white-space: nowrap;
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .selectize-control.repositories .selectize-dropdown .meta {
            list-style: none;
            margin: 0;
            padding: 0;
            font-size: 10px;
        }
        .selectize-control.repositories .selectize-dropdown .meta li {
            margin: 0;
            padding: 0;
            display: inline;
            margin-right: 10px;
        }
        .selectize-control.repositories .selectize-dropdown .meta li span {
            font-weight: bold;
        }
        .selectize-control.repositories::before {
            -moz-transition: opacity 0.2s;
            -webkit-transition: opacity 0.2s;
            transition: opacity 0.2s;
            content: ' ';
            z-index: 2;
            position: absolute;
            display: block;
            top: 50%;
            right: 34px;
            width: 16px;
            height: 16px;
            margin: -8px 0 0 0;
            background: url(../images/spinner.gif);
            background-size: 16px 16px;
            opacity: 0;
        }
        .selectize-control.repositories.loading::before {
            opacity: 0.4;
        }
        .icon {
            width: 16px;
            height: 16px;
            display: inline-block;
            vertical-align: middle;
            background-size: 16px 16px;
            margin: 0 3px 0 0;
        }
        .icon.fork {
            background-image: url(../images/repo-fork.png);
        }
        .icon.source {
            background-image: url(../images/repo-source.png);
        }

        /**
         * Rotton Tomatoes Demo
         */
        .selectize-control.movies .selectize-dropdown [data-selectable] {
            border-bottom: 1px solid rgba(0,0,0,0.05);
            height: 60px;
            position: relative;
            -webkit-box-sizing: content-box;
            box-sizing: content-box;
            padding: 10px 10px 10px 60px;
        }
        .selectize-control.movies .selectize-dropdown [data-selectable]:last-child {
            border-bottom: 0 none;
        }
        .selectize-control.movies .selectize-dropdown .by {
            font-size: 11px;
            opacity: 0.8;
        }
        .selectize-control.movies .selectize-dropdown .by::before {
            content: 'by ';
        }
        .selectize-control.movies .selectize-dropdown .name {
            font-weight: bold;
            margin-right: 5px;
        }
        .selectize-control.movies .selectize-dropdown .description {
            font-size: 12px;
            color: #a0a0a0;
        }
        .selectize-control.movies .selectize-dropdown .actors,
        .selectize-control.movies .selectize-dropdown .description,
        .selectize-control.movies .selectize-dropdown .title {
            display: block;
            white-space: nowrap;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .selectize-control.movies .selectize-dropdown .actors {
            font-size: 10px;
            color: #a0a0a0;
        }
        .selectize-control.movies .selectize-dropdown .actors span {
            color: #606060;
        }
        .selectize-control.movies .selectize-dropdown img {
            height: 60px;
            left: 10px;
            position: absolute;
            border-radius: 3px;
            background: rgba(0,0,0,0.04);
        }
        .selectize-control.movies .selectize-dropdown .meta {
            list-style: none;
            margin: 0;
            padding: 0;
            font-size: 10px;
        }
        .selectize-control.movies .selectize-dropdown .meta li {
            margin: 0;
            padding: 0;
            display: inline;
            margin-right: 10px;
        }
        .selectize-control.movies .selectize-dropdown .meta li span {
            font-weight: bold;
        }
        .selectize-control.movies::before {
            -moz-transition: opacity 0.2s;
            -webkit-transition: opacity 0.2s;
            transition: opacity 0.2s;
            content: ' ';
            z-index: 2;
            position: absolute;
            display: block;
            top: 50%;
            right: 34px;
            width: 16px;
            height: 16px;
            margin: -8px 0 0 0;
            background: url(../images/spinner.gif);
            background-size: 16px 16px;
            opacity: 0;
        }
        .selectize-control.movies.loading::before {
            opacity: 0.4;
        }

        /**
         * Email Contacts
         */
        .selectize-control.contacts .selectize-input [data-value] .email {
            opacity: 0.5;
        }
        .selectize-control.contacts .selectize-input [data-value] .name + .email {
            margin-left: 5px;
        }
        .selectize-control.contacts .selectize-input [data-value] .email:before {
            content: '<';
        }
        .selectize-control.contacts .selectize-input [data-value] .email:after {
            content: '>';
        }
        .selectize-control.contacts .selectize-dropdown .caption {
            font-size: 12px;
            display: block;
            opacity: 0.5;
        }</style>

@endsection

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.10/vue.min.js"></script>
<script>
    new Vue({
        el: '#filtercontent',
    })
</script>
