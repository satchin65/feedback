<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }} @hasSection('page_title')- @yield('page_title') @endif</title>
    <!-- Styles -->
    <link href="/dist/app.css" rel="stylesheet">
    <link href="/css/libs.css" rel="stylesheet">

    <!-- Scripts -->
    <script>
        window.Laravel = <?php echo json_encode([
                'csrfToken' => csrf_token(),
        ]); ?>
    </script>
    <script>window.$q=[];window.$=window.jQuery=function(a){window.$q.push(a);};</script>

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="/manifest.json">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="theme-color" content="#ffffff">


</head>
<body @hasSection('bodyclass') class="@yield('bodyclass')" @endif>



    <div id="app">

        @include('layouts.components.header')

        <div id="main">
            @include('layouts.components.sidebar')
            <div id="maincontent">@yield('content')</div>
        </div>{{--Main--}}

    </div>

<!-- Scripts -->
<script src="/dist/app.js"></script>
<script src="/dist/alertify.js"></script>
<script src="/js/libs.js"></script>
    @include('flash')
    <script>$.each($q,function(i,f){$(f)});$q=null;</script>
    <!-- Start of feedstack Zendesk Widget script -->
    <script>/*<![CDATA[*/window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement("iframe");window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,r.src="javascript:false",r.title="",r.role="presentation",(r.frameElement||r).style.cssText="display: none",d=document.getElementsByTagName("script"),d=d[d.length-1],d.parentNode.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(e){n=document.domain,r.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',o=s}o.open()._l=function(){var o=this.createElement("script");n&&(this.domain=n),o.id="js-iframe-async",o.src=e,this.t=+new Date,this.zendeskHost=t,this.zEQueue=a,this.body.appendChild(o)},o.write('<body onload="document._l();">'),o.close()}("https://assets.zendesk.com/embeddable_framework/main.js","feedstack.zendesk.com");
        /*]]>*/</script>
    <!-- End of feedstack Zendesk Widget script -->
</body>
</html>


