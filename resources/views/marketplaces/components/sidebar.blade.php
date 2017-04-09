<aside id="marketplace">
    <header>
        <h2>Filters</h2>
        <a href="/marketplaces/{{$marketplace->id}}/filter/new" class="btn btn-primary"><i class="glyphicon glyphicon-plus"></i> Add</a>
    </header>
    <div class="filtercontent">

        @foreach($modifiers as $modifier)
            <div onclick="location.href='/marketplaces/{{$marketplace->id}}/filter/{{$modifier->id}}'" class="filter_item modifier{{$modifier->id}} @if($current_modifier && $modifier->id === $current_modifier->id) active @endif" id="item_{{$modifier->id}}">
                <span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
                <p class="title">{{$modifier->name}}</p>
                <p class="description">Affected 100 product</p>
                <a href="/marketplaces/{{$marketplace->id}}/filter/{{$modifier->id}}/delete" class="deletemodifier"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>
            </div>
        @endforeach
    </div>
</aside>