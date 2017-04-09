@extends('layouts.app')

@section('content')
    <div class="container" id="dashboard">
        <div class="row blok_2col_right">
            <div class="blok_two_thirds">
                <div class="flexrow">
                    <div class="small_block">
                        <div class="image">
                            <img src="/images/dash_icon_product.png" width="62" height="62" alt="">
                        </div>
                        <div class="contents">
                            <p class="title">{{ $productCount }}</p>
                            <p class="subtitle">total products</p>
                        </div>
                    </div>

                    <div class="small_block">
                        <div class="image">
                            <img src="/images/dash_icon_channel.png" width="62" height="62" alt="">
                        </div>
                        <div class="contents">
                            <p class="title">{{ $channels }} channels</p>
                            <p class="subtitle">currently active</p>
                        </div>
                    </div>

                    <div class="small_block">
                        <div class="image">
                            <img src="/images/dash_icon_revenue.png" width="62" height="62" alt="">
                        </div>
                        <div class="contents">

                            <p class="title">&euro; {{ $total_revenue_today }},-</p>
                            <p class="subtitle">total revenue today</p>
                        </div>
                    </div>
                </div>

                <div class="flexrow">

                    <div class="panel panel-basic nopadding" style="flex:1;">
                        <div class="panel-title">
                            @lang('dashboard.Products statistics')
                        </div>
                        <div class="panel-content padding content-stats">

                        <StatsProducts :height="150"></StatsProducts>

                        </div>
                    </div>

                    <div class="panel panel-basic nopadding" style="flex:1;">
                        <div class="panel-title">
                            @lang('dashboard.Revenue statistics')
                        </div>
                        <div class="panel-content padding content-stats">

                            <statsorders :height="150"></statsorders>

                        </div>
                    </div>

                    {{--<div class="panel panel-basic nopadding" style="flex:1;">
                        <div class="panel-title">
                            @lang('settings.Products statistics')
                        </div>
                        <div class="panel-content padding">

                            <StatsProducts :height="200"></StatsProducts>

                        </div>
                    </div>--}}
                </div>




            </div>


            <div class="div blok_one_thirds">
                <div class="kader">
                    <h3>@lang('dashboard.Our setup guide')</h3>
                    <p>@lang('dashboard.Follow these steps in order to get the most out of our platform.')</p>
                    <div class="setupguidelist">
                        <div class="steps">
                            <a href="/settings/profile" class="stepitem">
                                <?php $active = 0; ?>
                                @if(currentAccount()->isEmailConfirmed())
                                    <span class="step"><i class="glyphicon glyphicon-ok"></i></span>
                                    <?php $active++; ?>
                                @else
                                    <span class="step <?php $active = 0; ?> active">1</span>
                                @endif
                                <span class="stepdesc">Confirm your e-mail</span>
                            </a>

                            <a href="/settings" class="stepitem">
                                @if(currentAccount()->isAccountCompleted())
                                    <span class="step"><i class="glyphicon glyphicon-ok"></i></span>
                                    <?php $active = 1; ?>
                                @else
                                    <span class="step @if($active == 1) <?php $active = 0; ?> active @endif">2</span>
                                @endif
                                <span class="stepdesc">Complete your account profile</span>
                            </a>

                            <a href="/connections" class="stepitem">
                                @if(currentAccount()->isConnectionSetup())
                                    <span class="step"><i class="glyphicon glyphicon-ok"></i></span>
                                    <?php $active++; ?>
                                @else
                                    <span class="step @if($active == 1) <?php $active = 0; ?> active @endif">3</span>
                                @endif
                                <span class="stepdesc">Setup your first connection</span>
                            </a>

                            <a href="/products" class="stepitem">
                                @if(currentAccount()->isProductsImported())
                                    <span class="step"><i class="glyphicon glyphicon-ok"></i></span>
                                    <?php $active++; ?>
                                @else
                                    <span class="step @if($active == 1) <?php $active = 0; ?> active @endif">4</span>
                                @endif
                                <span class="stepdesc">Import your first products</span>
                            </a>


                        </div>
                    </div>
                </div> {{--Kader--}}
                <p class="small">
                    In case you’ll be struggling with any of these steps just hit our support team
                    at <a href="mailto:support@feedstack.io">support@feedstack.io</a>. We will happily help you!
                </p>
            </div>
        </div>
    </div>
@endsection
