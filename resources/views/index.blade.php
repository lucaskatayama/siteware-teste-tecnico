
<!DOCTYPE html>
<html>
<head>
    <!-- Standard Meta -->
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

    <!-- Site Properties -->
    <title>Siteware Test - João Pedro Mantovani</title>

    <link rel="stylesheet" type="text/css" href="{{ asset("css/semantic.min.css") }}">
    <link rel="stylesheet" type="text/css" href="{{ asset("css/semantic-default.css") }}">
    <link rel="stylesheet" type="text/css" href="{{ asset("css/custom.css") }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/components/icon.min.css" />

</head>
<body>

<div class="ui fixed inverted menu">
    <div class="ui container">
        <a href="#" class="header item">
            <img class="logo" src="https://www.placehold.it/100x100">
            Siteware Test
        </a>
    </div>
</div>

<div class="ui main text container">

    <div class="ui equal width grid">
        <div class="column">
            @component('components.search')
            @endcomponent
        </div>
        <div class="four column row">
            <div class="column">
                @component('components.favorites')
                @endcomponent
            </div>
            <div class="column">
                @component('components.card')
                @endcomponent
            </div>
        </div>
    </div>

</div>

{{--<div class="ui inverted vertical footer segment">--}}
    {{--<div class="ui center aligned container">--}}
        {{--<img src="https://www.placehold.it/100x100" class="ui centered mini image">--}}
        {{--<div class="ui horizontal inverted small divided link list">--}}
            {{--<a class="item" href="#">João Pedro Mantovani</a>--}}
            {{--<a class="item" href="#">Github</a>--}}
            {{--<a class="item" href="#">Linkedin</a>--}}
        {{--</div>--}}
    {{--</div>--}}
{{--</div>--}}
<script
        src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"></script>
    <script src="{{ asset("js/semantic.min.js") }}"></script>
    <script src="{{ asset("js/search.js") }}"></script>
</body>

</html>
