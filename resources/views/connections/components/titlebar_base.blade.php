@section('titlebar_title')
    {{--@if(isset($connection)) <div class="avatar" style="background:url('/images/entities/Connection{{$connection->connection_type->name}}.png') center center no-repeat; background-size:cover;"></div> @endif--}}
    @if(isset($connection)) <h1>Connections > {{$connection->name}}</h1> @else
        <div class="avatar"><i class="icon-download"></i></div>
        <h1>Connections</h1>
    @endif
    <p>Feeds and store connections to import products</p>
@endsection


@section('titlebar_action')
    <nav id="actionset">
        @if(isset($connection))
        <?php
        $current = explode('/',$_SERVER['REQUEST_URI']);
        ?>

        <div class="toptabs">
            <a  href="/connections/{{ $connection->id }}" class="tab-link account @if(!isset($current[3])) active @endif">
                @lang('connections.Settings')
            </a>

            <a class="tab-link account @if(isset($current[3])) active @endif " href="/connections/{{ $connection->id }}/mapping" >
                @lang('connections.Mapping')
            </a>

        </div>
        @else
            <nav id="actionset">
                <a href="/connections/create" class="btn btn-primary"><i class="glyphicon glyphicon-plus"></i> @lang('connections.Add Connection')</a>
            </nav>
        @endif
    </nav>
@endsection