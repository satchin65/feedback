@extends('layouts.app')

@section('content')


@section('titlebar_title')
    <div class="avatar"><i class="icon-gear"></i></div>
    <h1>@lang('settings.Finance settings')</h1>
    <p>@lang('settings.Subscriptions, invoices and all other financial information')</p>
@endsection


@include('settings.components.titlebar_base')
@include('components.titlebar')




    <div class="container settings">
        <div class="row">

            <div class="panel panel-basic nopadding maxwidth">
                <div class="panel-title">
                    @lang('settings.Subscription')
                </div>
                <div class="panel-content padding">
                    <p class="description">
                        @lang('settings.Current status'): <strong>{{ $account->subscriptionStatus() }}</strong>
                    </p>

                    <p>

                        @foreach($account->subscriptions()->get() as $subscription)
                            {{ \Carbon\Carbon::parse($subscription->ends_at)->format('Y-m-d') }}
                        @endforeach
                    </p>
                    <div class="flexform">
                        <form action="/settings/finance" method="POST">
                            {{csrf_field()}}
                            <input type="hidden" name="plan" value="Basic">
                            <input type="submit" class="btn btn-primary" value="@lang('settings.Subscribe to Basic plan')">
                        </form>

                    </div>
                </div>
            </div>

        </div>{{--Row--}}


        <div class="panel panel-basic nopadding maxwidth">
            <div class="panel-title">
                @lang('settings.Invoices')
            </div>
            <div class="panel-content nopadding">
                <table>
                    <thead>
                        <tr>
                            <th width="200">Invoice #</th>
                            <th width="250" style="max-width:100px;">@lang('general.Date')</th>
                            <th width="250" style="max-width:100px;">@lang('general.Amount')</th>
                            <th width="250" style="max-width:100px;">@lang('general.Status')</th>
                            <th width="200">@lang('general.Actions')</th>
                        </tr>
                    </thead>
                    <tbody>
                    @foreach($invoices as $invoice)
                        <tr>
                            <td>{{ $invoice->id }}</td>
                            <td>{{ $invoice->created_at->format('Y-m-d') }}</td>
                            <td>&euro; {{ number_format($invoice->amount,2) }}</td>
                            <td>Paid</td>
                            <td>Download</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>




    </div>{{--Container--}}



@endsection
