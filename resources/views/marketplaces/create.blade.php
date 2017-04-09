@extends('layouts.app')

@section('content')

    @include('marketplaces.components.titlebar_base')
    @include('components.titlebar')

    <div class="container">
        <div class="row">
            <div class="panel panel-basic nopadding maxwidth">



                        <div class="panel-title">
                            @if($marketplace->name)
                                <i class="glyphicon glyphicon-cog"></i> {{ $marketplace->name }}
                            @else
                                <i class="glyphicon glyphicon-cog"></i> @lang('marketplaces.New marketplace')
                            @endif
                        </div>
                        <div class="panel-content padding">

                            @if($marketplace->name)
                                <form action="/marketplaces/{{$marketplace->id}}" method="post">
                                    @else
                                        <form action="/marketplaces/create" method="post">
                                            @endif

                            {{ csrf_field() }}




                                <div class="flexform">

                                    @include('components.form_input',[ 'label' => 'Marketplace name', 'name' => 'name', 'value' => $marketplace->name])

                                    <div class="form-group">
                                        <label for="name">@lang('marketplaces.Marketplace'):</label>
                                        <select name="entity" class="chosen" id="" @if($marketplace->entity) disabled @endif>
                                            <option value="">-- Select --</option>
                                            @foreach($entities as $entity)
                                                <option value="Marketplace{{$entity}}" @if($marketplace->entity == 'Marketplace'.$entity) selected @endif>{{$entity}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="flexform">
                                    <div class="form-group">
                                        <label for="name">@lang('marketplaces.Product identifier'):</label>
                                        <select name="identifier" class="chosen" id="" @if($marketplace->identifier) disabled @endif>
                                            @foreach($productColumns as $column)
                                                <option value="{{$column}}"
                                                        @if($marketplace->identifier == $column) selected @endif
                                                        @if(!$marketplace->identifier && $column == 'sku') selected @endif
                                                >{{$column}}</option>
                                            @endforeach
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label for="name">@lang('marketplaces.Marketplace active'):</label>
                                        <select name="active" class="chosen" id="">
                                            <option value="0" @if(!$marketplace->active || $marketplace->active == '0') selected @endif>@lang('general.No') - @lang('general.No products get send')</option>
                                            <option value="1" @if($marketplace->active == '1') selected @endif>@lang('general.Yes')</option>
                                        </select>
                                    </div>
                                </div>

                                <hr>



                                @if(isset($entityClass))
                                    @foreach($entityClass->attributes as $attribute => $type)
                                        @include('marketplaces.components.attributes')
                                    @endforeach
                                            @endif




                                <div class="button-set">
                                    @if($marketplace->name)
                                        <button type="submit" class="btn btn-primary btn-small">@lang('general.Save')</button>
                                        <a href="/marketplaces/{{$marketplace->id}}/delete" class="btn btn-gray btn-small">@lang('general.Delete')</a>
                                    @else
                                        <button type="submit" class="btn btn-primary btn-small">@lang('marketplaces.Add marketplace')</button>
                                    @endif
                                </div>

                                </form>
                        </div>


            </div>
        </div>{{--Row--}}
    </div>{{--Container--}}
@endsection
