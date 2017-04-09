@section('titlebar_title')
    <div class="avatar" style="background:url('/images/entities/{{$marketplace->entity}}.png') center center no-repeat; background-size:cover;"></div>
    <h1><a href="/marketplaces/">Marketplaces</a> > {{$marketplace->name}}</h1>
    <p>API connections to external marketplaces</p>
@endsection

@section('titlebar_action')
    <nav id="actionset">
        <?php
        $current = explode('/',$_SERVER['REQUEST_URI']);
        ?>

        <div class="toptabs">
            <a  href="/marketplaces/{{$marketplace->id}}" class="tab-link account @if(isset($current[3]) && $current[3] != 'mapping' && $current[3] != 'filter' && $current[3] != 'preview' || !isset($current[3])) active @endif">
                @lang('marketplaces.Marketplace settings')
            </a>

            <a class="tab-link account @if(isset($current[3]) && $current[3] == 'filter') active @endif " href="/marketplaces/{{$marketplace->id}}/filter" >
                @lang('marketplaces.Filter')
            </a>

            <a class="tab-link account @if(isset($current[3]) && $current[3] == 'mapping') active @endif " href="/marketplaces/{{$marketplace->id}}/mapping" >
                @lang('connections.Mapping')
            </a>

            <a class="tab-link account @if(isset($current[3]) && $current[3] ==  'preview') active @endif " href="/marketplaces/{{$marketplace->id}}/preview" >
                @lang('marketplaces.Preview')
            </a>
        </div>
    </nav>
@endsection