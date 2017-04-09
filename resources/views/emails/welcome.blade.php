@include('emails.components.header')



<!-- content -->
<table class="email_table" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
        <td class="email_body">
            <div class="email_container">
                <!--[if (gte mso 9)|(IE)]><table width="632" border="0" cellspacing="0" cellpadding="0" align="center" style="vertical-align: top;"><tbody><tr><td width="632" align="center" valign="top"><![endif]-->
                <table class="content_section" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                    <tr>
                        <td class="content_cell padding-top">
                            <table class="column" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                <tr>
                                    <td class="column_cell default_font text-center padding-bottom padding-top">
                                        <h3>@lang('mails.Hi :firstname, Welcome', ['firstname' => $user->firstname])</h3>
                                        <p>@lang('mails.Thank you for signing up to our amazing application. To start using the application please verify your email and proceed choosing your plan.')</p>
                                        <table class="primary_btn" align="center" border="0" cellspacing="0" cellpadding="0">
                                            <tbody>
                                            <tr>
                                                <td class="default_font"><a href="{{env('APP_URL')}}/email/confirm/{{$user->email_confirm}}"><span>@lang('mails.Confirm email')</span></a></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <!--[if (gte mso 9)|(IE)]></td></tr></tbody></table><![endif]-->
            </div>
        </td>
    </tr>
    </tbody>
</table>
<!-- spacer_large -->
<table class="email_table" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
        <td class="email_body">
            <div class="email_container">
                <!--[if (gte mso 9)|(IE)]><table width="632" border="0" cellspacing="0" cellpadding="0" align="center" style="vertical-align: top;"><tbody><tr><td width="632" align="center" valign="top"><![endif]-->
                <table class="content_section" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                    <tr>
                        <td class="content_cell padding-top-extra">&nbsp; </td>
                    </tr>
                    </tbody>
                </table>
                <!--[if (gte mso 9)|(IE)]></td></tr></tbody></table><![endif]-->
            </div>
        </td>
    </tr>
    </tbody>
</table>
<!-- spacer_large -->

{{--@include('emails.components.footer')--}}