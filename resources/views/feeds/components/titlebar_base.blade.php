@section('titlebar_title')
    <div class="avatar" style="background:url('/images/entities/{{$feed->entity}}.png') center center no-repeat; background-size:cover;"></div>
    <h1><a href="/feeds/">Feeds</a> > {{$feed->name}}</h1>
    <p>Product feeds</p>
@endsection

@section('titlebar_action')
    <nav id="actionset">
        <?php
        $current = explode('/',$_SERVER['REQUEST_URI']);
        ?>

        <div class="toptabs">
            <a  href="/feeds/{{$feed->id}}" class="tab-link account @if(isset($current[3]) && $current[3] != 'mapping' && $current[3] != 'filter' && $current[3] != 'preview' && $current[3] != 'categories' || !isset($current[3])) active @endif">
                @lang('feeds.Feed settings')
            </a>

            <a class="tab-link account @if(isset($current[3]) && $current[3] == 'categories') active @endif " href="/feeds/{{$feed->id}}/categories" >
                @lang('feeds.Categories')
            </a>

            <a class="tab-link account @if(isset($current[3]) && $current[3] == 'filter') active @endif " href="/feeds/{{$feed->id}}/filter" >
                @lang('feeds.Filters')
            </a>

            <a class="tab-link account @if(isset($current[3]) && $current[3] == 'mapping') active @endif " href="/feeds/{{$feed->id}}/mapping" >
                @lang('feeds.Mapping')
            </a>

            <a class="tab-link account @if(isset($current[3]) && $current[3] ==  'preview') active @endif " href="/feeds/{{$feed->id}}/preview" >
                @lang('feeds.Preview')
            </a>
        </div>
    </nav>
@endsection