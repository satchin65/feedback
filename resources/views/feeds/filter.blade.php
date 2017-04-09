@extends('layouts.app')

@section('content')
        @include('feeds.components.titlebar_base')
        @include('components.titlebar')

        <div class="col2_left">
            @include('feeds.components.sidebar')

            <div class="container" id="filtercontainer">
                <form action="" method="POST">
                    {{csrf_field()}}


                        <div class="row">
                            <div class="panel panel-basic nopadding">
                                <div class="panel-title">
                                    Filters
                                </div>
                                <div class="panel-content" id="filtercontent">

                                    <?php $i=0; ?>
                                    @foreach($filtercontent as $filter)
                                        <div class="panel-row">
                                            @if($i==0)
                                                <span class="ifblock">IF</span>
                                            @else
                                                <span class="ifblock">AND</span>
                                            @endif

                                            <select name="field[{{$filter['id']}}]" placeholder="field">
                                                @foreach($productColumns as $field)
                                                    <option value="{{$field}}" {{$field==$filter['field'] ? 'SELECTED' : ''}}>{{$field}}</option>
                                                @endforeach
                                            </select>

                                            <select name="method[{{$filter['id']}}]" v-show="field[{{$filter['id']}}]" placeholder="method">
                                                @foreach($filter_methods as $method)
                                                    <option value="{{$method}}" {{$method==$filter['filter'] ? 'SELECTED' : ''}}>@lang('filters.'.$method)</option>
                                                @endforeach
                                            </select>

                                            <input name="value[{{$filter['id']}}]" type="text" placeholder="Value" value="{{ $filter['value'] }}">

                                            <a href="/feeds/{{$feed->id}}/filter/{{$current_modifier->id}}/delete/{{$filter['id']}}" class="btn btn-gray btn-small"><i class="glyphicon glyphicon-trash"></i></a>
                                        </div>
                                        <?php $i++; ?>
                                    @endforeach
                                    <a href="/feeds/{{$feed->id}}/filter/{{$current_modifier->id}}/add-and" class="btn btn-gray btn-small addand"><i class="glyphicon glyphicon-plus"></i> and</a>

                                </div>
                            </div>




                            <div class="panel panel-basic nopadding">
                                <div class="panel-title">
                                    Action
                                </div>
                                <div class="panel-content" id="filtercontent">

                                    <?php $i=0; ?>
                                    @foreach($actioncontent as $action)
                                        <div class="panel-row">

                                            <select name="actionaction[{{$action['id']}}]"  placeholder="method">
                                                @foreach($action_methods as $method)
                                                    <option value="{{$method}}" {{$method==$action['action'] ? 'SELECTED' : ''}}>@lang('filters.'.$method)</option>
                                                @endforeach
                                            </select>

                                            <select name="actionfield[{{$action['id']}}]" placeholder="field" v-if="field[{{$action['id']}}]">
                                                @foreach($productColumns as $field)
                                                    <option value="{{$field}}" {{$field==$action['field'] ? 'SELECTED' : ''}}>{{$field}}</option>
                                                @endforeach
                                            </select>

                                            <input name="actionvalue[{{$action['id']}}]" type="text" placeholder="Value" value="{{ $action['value'] }}">

                                            <a href="/feeds/{{$feed->id}}/action/{{$current_modifier->id}}/delete/{{$action['id']}}" class="btn btn-gray btn-small"><i class="glyphicon glyphicon-trash"></i></a>
                                        </div>
                                        <?php $i++; ?>
                                    @endforeach
                                    <a href="/feeds/{{$feed->id}}/action/{{$current_modifier->id}}/add-and" class="btn btn-gray btn-small addand"><i class="glyphicon glyphicon-plus"></i> and</a>

                                </div>
                            </div>

                            <input type="submit" class="btn btn-primary" value="Save filter">

                </form>
                </div>{{--Row--}}


            </div>{{--Container--}}
        </div>

@endsection

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.10/vue.min.js"></script>
<script>
    new Vue({
        el: '#filtercontent',
    })
</script>

