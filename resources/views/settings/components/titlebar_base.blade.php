@section('titlebar_title')
    <div class="avatar"><i class="icon-gear"></i></div>
    <h1>Store settings</h1>
    <p>Configure your store settings</p>
@endsection

@section('titlebar_action')
    <nav id="actionset">
        <?php
        $current = explode('/',$_SERVER['REQUEST_URI']);
        ?>

        <div class="toptabs">
            <a  href="/settings/account" class="tab-link account @if($current[2] ==  'account') active @endif">
                @lang('settings.Account')
            </a>

            <a class="tab-link account @if($current[2] == 'finance') active @endif " href="/settings/finance" >
                @lang('settings.Finance')
            </a>

            <a class="tab-link account @if($current[2] == 'store') active @endif " href="/settings/store" >
                @lang('settings.Store')
            </a>

            <a class="tab-link account @if($current[2] == 'users') active @endif " href="/settings/users" >
                @lang('settings.Users')
            </a>

            {{--<a class="tab-link account @if($current[2] == 'users') active @endif " href="/settings/users" >
                @lang('settings.Users')
            </a>--}}

            <a class="tab-link account @if($current[2] ==  'profile') active @endif " href="/settings/profile" >
                @lang('settings.Profile')
            </a>
        </div>
    </nav>
@endsection