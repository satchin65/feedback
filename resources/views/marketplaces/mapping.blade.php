@extends('layouts.app')

@section('content')

    @include('marketplaces.components.titlebar_base')
    @include('components.titlebar')

        <div class="container">
            <div class="row">
                <form action="/marketplaces/{{$marketplace->id}}/mapping" method="post">
                <div class="panel panel-basic">

                    <div class="tab-content nopadding">

                            {{csrf_field()}}
                            <div class="padding"><h3><i class="glyphicon glyphicon-cog"></i> @lang('connections.New connection')</h3></div>
                            <table id="marketplacemap">
                                <thead>
                                <tr>
                                    <th>@lang('general.Field key')</th>
                                    <th>@lang('general.Mapping')</th>
                                    <th>@lang('general.Value')</th>
                                </tr>
                                </thead>
                                <tbody>
                                    @foreach($requiredFields as $field)
                                        <tr>
                                            <td>{{$field->field}} @if($field->required)* @endif</td>
                                            <td>
                                                <select name="map[{{$field->field}}]" class="field_{{$field->field}}">
                                                    <option value=""></option>
                                                    <option value="custom" @if(is_array($channelmappings) && $channelmappings[$field->field]['source'] == "custom") selected @endif>@lang('marketplaces.Custom value')</option>
                                                    @foreach($productColumns as $column)
                                                        <option value="{{$column}}"
                                                                @if(!is_array($channelmappings) && $field->field == $column) selected @endif
                                                                @if(is_array($channelmappings) && $channelmappings[$field->field]['source'] == $column) selected @endif
                                                        >{{$column}}</option>
                                                    @endforeach
                                                </select>
                                            </td>
                                            <td><input type="text" name="value[{{$field->field}}]"
                                                       @if(is_array($channelmappings) && $channelmappings[$field->field]['source'] == 'custom')
                                                               value="{{$channelmappings[$field->field]['value']}}"
                                                       @else
                                                            disabled class="disabled value_{{$field->field}}"
                                                        @endif
                                                ></td>
                                            <script>



                                                    $(function(){

                                                        $('.field_{{$field->field}}').change(function(){
                                                           if($(this).val() == 'custom')
                                                           {
                                                               $('.value_{{$field->field}}').prop("disabled", false);
                                                               $('.value_{{$field->field}}').removeClass('disabled');
                                                           }else{
                                                               $('.value_{{$field->field}}').prop("disabled", true);
                                                               $('.value_{{$field->field}}').addClass('disabled');
                                                           }
                                                        });
                                                    });

                                            </script>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>



                    </div>

                </div>
                <div class="button-set padding">
                    <button type="submit" class="btn btn-primary">@lang('connections.Save mapping')</button>
                </div>

                </form>
            </div>{{--Row--}}
        </div>{{--Container--}}
@endsection