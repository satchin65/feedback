@if(Auth::check())
    @if(Session::has('account') && Session::has('store'))
        <div id="sidebar">


                <nav id="primary">
                        <a href="/dashboard" class="nav-item @if(preg_match('/dashboard/',$_SERVER['REQUEST_URI'])) active @endif"> <i class="icon-device-desktop"></i> Dashboard</a>

                    <span class="nav_title">Set up</span>
                        <a href="/settings" class="nav-item @if(preg_match('/settings/',$_SERVER['REQUEST_URI'])) active @endif"><i class="icon-gear"></i> Store settings</a>
                        <a href="/connections" class="nav-item @if(preg_match('/connections/',$_SERVER['REQUEST_URI'])) active @endif"><i class="icon-download"></i> Connections</a>

                    <span class="nav_title">Channels</span>
                        <a href="/feeds" class="nav-item @if(preg_match('/feeds/',$_SERVER['REQUEST_URI'])) active @endif"><i class="icon-feed"></i> Feeds</a>
                        <a href="/marketplaces" class="nav-item @if(preg_match('/marketplaces/',$_SERVER['REQUEST_URI'])) active @endif"><i class="icon-store"></i> Marketplaces</a>
                        <a href="/products" class="nav-item @if(preg_match('/products/',$_SERVER['REQUEST_URI'])) active @endif"><i class="icon-basket"></i> Products</a>
                        <a href="/orders" class="nav-item @if(preg_match('/orders/',$_SERVER['REQUEST_URI'])) active @endif"><i class="icon-cart"></i> Orders</a>

                @if(Auth::user()->admin == 1)
                    <span class="nav_title">Admin</span>
                        <a href="/admin/accounts" class="nav-item @if(preg_match('/accounts/',$_SERVER['REQUEST_URI'])) active @endif"><i class="icon-briefcase"></i> Accounts</a>
                        <a href="/admin/stores" class="nav-item @if(preg_match('/stores/',$_SERVER['REQUEST_URI'])) active @endif"><i class="icon-monitor"></i> Stores</a>
                        <a href="/admin/users" class="nav-item @if(preg_match('/users/',$_SERVER['REQUEST_URI'])) active @endif"><i class="icon-user"></i> Users</a>
                @endif
                </nav>

        </div>
    @endif
@endif