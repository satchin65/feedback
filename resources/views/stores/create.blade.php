@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="panel panel-basic small-panel storeselector nopadding">
                <div class="content-title">
                    <h2 class="a-center">@lang('stores.Create store')</h2>
                </div>
                <form action="/stores/create" method="post">

                    {{ csrf_field() }}
                    @include('components.form_input',[ 'label' => 'Store name', 'name' => 'name', 'value' => ''])
                    @include('components.form_input',[ 'label' => 'Store URL', 'name' => 'url', 'value' => ''])

                    <div class="button-set">
                        <button type="submit" class="btn btn-primary btn-small">@lang('connections.Add Connection')</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
@endsection
