@extends('layouts.app')

@section('content')

    @include('connections.components.titlebar_base')
    @include('components.titlebar')



    <div class="container">
        <div class="row">
            <form action="/connections/{{$connection->id}}/mapping" method="post">
                {{csrf_field()}}
                <div class="panel panel-basic nopadding">

                    <table>
                        <thead>
                        <tr>
                            <th>@lang('connections.Connection fields')</th>
                            <th>@lang('connections.Feedstack field mapping')</th>
                            <th>@lang('connections.Custom field')</th>
                        </tr>
                        </thead>
                        <tbody>

                        @if(!$mappings)
                            @foreach($xmlKeys as $key)
                                <?php $match = ''; ?>
                                @if($keys_matches[$key])
                                    <tr>
                                        <td class="a-left">{{ $key }}</td>
                                        <input type="hidden" name="{{$key}}[text]" value="{{$key}}">
                                        <td class="fields">
                                            <select name="{{$key}}[value]" id="" class="{{$key}}_select">
                                                <option value="">-- Do not import --</option>
                                                @foreach($keys_matches as $source => $value)
                                                    @if($value)
                                                        <option value="{{$value}}" @if($source == $key) selected @endif>{{$value}}</option>
                                                    @else
                                                        <option value="{{$source}}" @if($source == $key) selected @endif>{{$source}}</option>
                                                    @endif
                                                @endforeach
                                            </select>
                                            <input type="text" name="{{$key}}[custom_value]" class="{{$key}}_input"  style="display:none">
                                        </td>
                                        <td>
                                            <input name="{{$key}}[custom]" value="1" type="checkbox">
                                        </td>
                                    </tr>
                                @endif
                            @endforeach

                            @foreach($xmlKeys as $key)
                                <?php $match = ''; ?>
                                @if(!$keys_matches[$key])
                                    <tr>
                                        <td class="a-left">
                                           {{ $key }}
                                        </td>
                                        <td class="fields">
                                            <select name="{{$key}}[value]" id="" class="{{$key}}_select" style="display:none">
                                                        <option value="">-- Do not import --</option>
                                                @foreach($keys_matches as $source => $value)
                                                    @if($value)
                                                        <option value="{{$value}}" @if($source == $key) selected @endif>{{$value}}</option>
                                                    @else
                                                        <option value="{{$source}}" @if($source == $key) selected @endif>{{$source}}</option>
                                                    @endif
                                                @endforeach
                                            </select>
                                            <input type="text" name="{{$key}}[custom_value]" class="{{$key}}_input" value="{{$key}}">
                                        </td>
                                        <td>
                                            <input name="{{$key}}[custom]" value="1" type="checkbox" checked>
                                        </td>
                                    </tr>
                                @endif

                            @endforeach
                        @else

                            @foreach($mappings as $map => $result)

                                <tr>
                                    <td class="a-left">
                                            {{ $result }}
                                    </td>
                                    <td class="fields">

                                        <select name="{{$result}}[value]" id="" class="{{$map}}_select" @if(!in_array($map,$columns)) style="display:none" @endif>
                                            <option value="">-- Do not import --</option>
                                            @foreach($keys_matches as $source => $value)
                                                @if($value)
                                                    <option value="{{$value}}" @if($value == $map) selected @endif>{{$value}}</option>
                                                @else
                                                    <option value="{{$source}}" @if($value == $map) selected @endif>{{$source}}</option>
                                                @endif
                                            @endforeach
                                        </select>
                                        <input type="text" name="{{$result}}[custom_value]" class="{{$result}}_input" value="{{$result}}" @if(in_array($map,$columns)) style="display:none" @endif>

                                    </td>
                                    <td>
                                        <input name="{{$result}}[custom]" value="1" type="checkbox" @if(!in_array($map,$columns)) checked @endif>
                                    </td>
                                </tr>
                            @endforeach
                        @endif

                            {{--<tr class="footeraction">
                                <td colspan="4">
                                    <a href="/connections/{{ $connection->id }}/mapping/custom-field" class="btn btn-secondary btn-small"><i class="glyphicon glyphicon-plus"></i> add custom field</a>
                                </td>
                            </tr>--}}

                        </tbody>
                    </table>


                </div>

                <button type="submit" class="btn btn-primary">@lang('connections.Save &amp; start import')</button>
                <a href="/connections/{{$connection->id}}/mapping/reset" class="btn btn-secondary">@lang('connections.Reset mapping')</a>
            </form>
        </div>{{--Row--}}

    </div>{{--Container--}}


@endsection
