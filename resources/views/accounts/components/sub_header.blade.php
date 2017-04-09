@section('sub_header')

    <div class="pagetitle">
        <span class="title">@yield('page_title')</span>
        <span class="sub_title">@yield('page_sub_title')</span>
    </div>

    <div class="btn-group">

        <a href="" class="btn-box active">
            <i class="glyphicon glyphicon-cog"></i>
            <span>@lang('account_settings.Settings')</span>
        </a>

        <a href="" class="btn-box">
            <i class="glyphicon glyphicon-home"></i>
            <span>@lang('account_settings.Addresses')</span>
        </a>

        <a href="" class="btn-box">
            <i class="glyphicon glyphicon-calendar"></i>
            <span>@lang('account_settings.Subscription')</span>
        </a>

        <a href="" class="btn-box">
            <i class="glyphicon glyphicon-user"></i>
            <span>@lang('account_settings.Users')</span>
        </a>

    </div>
@endsection
