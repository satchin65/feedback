@extends('layouts.app')

@section('content')

    @include('feeds.components.titlebar_base')
    @include('components.titlebar')

    <div class="container">
        <div class="row">
            <div class="panel panel-basic nopadding maxwidth">



                        <div class="panel-title">
                            @if($feed->name)
                                <i class="glyphicon glyphicon-cog"></i> {{ $feed->name }}
                            @else
                                <i class="glyphicon glyphicon-cog"></i> @lang('feeds.New feed')
                            @endif
                        </div>
                        <div class="panel-content padding">

                            @if($feed->name)
                                <form action="/feeds/{{$feed->id}}" method="post">
                                    {{ method_field('PATCH') }}

                                @else
                                <form action="/feeds" method="post">
                            @endif

                            {{ csrf_field() }}




                                <div class="flexform">

                                    @include('components.form_input',[ 'label' => 'Feed name', 'name' => 'name', 'value' => $feed->name])

                                    <div class="form-group">
                                        <label for="name">@lang('feeds.Feed'):</label>
                                        <select name="entity" class="chosen" id="" @if($feed->entity) disabled @endif>
                                            <option value="">-- Select --</option>
                                            @foreach($entities as $entity)
                                                <option value="Feed{{$entity}}" @if($feed->entity == 'Feed'.$entity) selected @endif>{{$entity}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>


                                    <div class="form-group">
                                        <label for="name">@lang('feeds.Feed active'):</label><br/>
                                        <select name="active" class="chosen" id="" style="max-width:100px;">
                                            <option value="0" @if(!$feed->active || $feed->active == '0') selected @endif>@lang('general.No')</option>
                                            <option value="1" @if($feed->active == '1') selected @endif>@lang('general.Yes')</option>
                                        </select>
                                    </div>

                                <hr>



                                @if(isset($entityClass))
                                    @foreach($entityClass->attributes as $attribute => $type)
                                        @include('feeds.components.attributes')
                                    @endforeach
                                            @endif




                                <div class="button-set">
                                    @if($feed->name)
                                        <button type="submit" class="btn btn-primary btn-small">@lang('general.Save')</button>
                                        <a href="/feeds/{{$feed->id}}/delete" class="btn btn-gray btn-small">@lang('general.Delete')</a>
                                    @else
                                        <button type="submit" class="btn btn-primary btn-small">@lang('feeds.Add feed')</button>
                                    @endif
                                </div>

                                </form>
                        </div>


            </div>
        </div>{{--Row--}}
    </div>{{--Container--}}
@endsection
