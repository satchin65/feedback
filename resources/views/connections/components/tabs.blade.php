<?php $current = explode('/',$_SERVER['REQUEST_URI']); ?>
<ul class="tab-navigation">
    <li>
        <a @if(end($current) == 'mapping') href="/connections/{{$connection->id}}" @endif class="tab-link account @if(end($current) != 'mapping') active @endif"><i class="glyphicon glyphicon-cog"></i>@lang('connections.Feed settings')</a>
    </li>

    <li>
        <a class="tab-link account @if(end($current) == 'mapping') active @endif @if($connection->feed_url) inactive" href="/connections/{{$connection->id}}/mapping" @else " href="#" @endif>
            <i class="glyphicon glyphicon-random"></i>@lang('connections.Mapping')
        </a>
    </li>

    {{--<li><a href="#account" class="tab-link account inactive"><i class="glyphicon glyphicon-cog"></i>@lang('connections.Result')</a></li>--}}
</ul>