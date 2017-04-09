@if(Auth::check())
    <div id="head">
        <div class="top_icon">
            <a href="/dashboard"><img src="/images/icon_white.svg" height="25" alt="FeedStack"></a>
        </div>
        <div class="top_storeselector">


            <span class="storeselect">
                <div class="storename">
                    <img src="/images/hamburger.svg" alt="Store switcher">
                </div>
            </span>
            <div class="dropsubmenustores">
                @foreach(currentAccount()->getStores() as $store)
                    <a href="/stores/choose/{{ $store->id }}" class="@if($store->id == currentStore()->id) active @endif"> {{ $store->name }}</a>
                @endforeach
                    <a href="/stores/" class="addstore"><span>+</span>@lang('general.add new store')</a>

            </div>
        </div>
        <div class="currentstore">
            @if(Session::has('store'))
                {{ currentStore()->name }}
            @endif
        </div>



        <div class="account_block">
            <div class="name_account">
                <span class="name">Hi, {{ Auth::user()->firstname }}!</span>
            </div>
            <div class="avatar" style="background:url({{ Auth::user()->getAvatar() }}); background-size:cover;">

            </div>
        </div>

        <div class="helpsupport" onclick="location.href='http://feedstack.zendesk.com'">
            <i class="icon-help"></i> Help and support
        </div>
    </div>

    <div class="dropsubmenu">
        <div><a href="/dashboard"><i class="glyphicon glyphicon-th"></i> Dashboard</a></div>
        <div><a href="/settings"><i class="glyphicon glyphicon-cog"></i>Settings</a></div>
        {{--<div><a href="/settings/users"><i class="glyphicon glyphicon-user"></i> Users</a></div>--}}
        <div class="logout"><a href="/logout"> <i class="glyphicon glyphicon-log-out"></i> Logout</a></div>
    </div>

@endif