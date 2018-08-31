$(document).ready(function () {

    for (var i = 0; i < $.localStorage.keys().length; i++) {
        if ($.localStorage.keys()[i].match(/^[0-9]+$/) != null) {
            var item = $("#favorite-item-template").children().clone();
            item.prop('id', $.localStorage.keys()[i]);
            item.text($.localStorage.get($.localStorage.keys()[i]));
            item.appendTo("#favorite-segment");

            var r = $('<button class="btn-favorite ui basic compact right floated mini button trash-favorite-icon-action-btn">' +
                '<i class="trash fitted icon"></i><span class="city-id hidden">' + $.localStorage.keys()[i] + '</span></button>');
            $(item).append(r);
        }
    }

    $('#favorite-segment .favorite-item')
        .transition({
            animation : 'scale',
            reverse   : 'auto', // default setting
            interval  : 200
        })
    ;

    $('#card-show-weather .favorite-icon-action-btn').on('click', function() {
        var template = $("#card-show-weather");
        var city_id = template.find(".city-id").text();
        var name = template.find(".card-city-name").text();

        var storage = $.localStorage;

        // non exists
        if (!storage.isSet(city_id)) {
            storage.set(city_id, name);

            $(template.find(".favorite-content"))
                .transition({
                    animation  : 'scale',
                    duration   : '.3s',
                    onComplete : function() {
                        template.find(".favorite-icon-action-btn").addClass("red");
                        template.find(".favorite-text-action").text("Saved");

                        $('.favorite-content')
                            .transition({
                                animation  : 'scale',
                                duration   : '.3s',
                            })
                        ;

                        $('.trash-favorite-content')
                            .transition({
                                animation  : 'scale',
                                duration   : '.3s',
                            })
                        ;
                    }
                })
            ;

            var item = $("#favorite-item-template").children().clone();
            console.log(item);
            item.prop('id', city_id);
            item.text(storage.get(city_id));
            item.appendTo("#favorite-segment");

            var r = $('<button class="btn-favorite ui basic compact right floated mini button trash-favorite-icon-action-btn">' +
                '<i class="trash fitted icon"></i><span class="city-id hidden">'+ city_id +'</span></button>');
            $(item).append(r);

            item.transition('fly left');
        }

        // exists
        else {

        }
    });

    $('#card-show-weather .trash-favorite-icon-action-btn').on('click', function() {
        var template = $("#card-show-weather");
        var city_id = template.find(".city-id").text();
        if (city_id === "") {
            console.log(this.find(".city-id"));
        }
        var name = template.find(".card-city-name").text();

        var storage = $.localStorage;
        // exists
        if (storage.isSet(city_id)) {
            storage.remove(city_id);

            $(template.find(".favorite-content"))
                .transition({
                    animation  : 'scale',
                    duration   : '.3s',
                    onComplete : function() {
                        template.find(".favorite-icon-action-btn").removeClass("red");
                        template.find(".favorite-text-action").text("Favorite City");

                        $('.favorite-content')
                            .transition({
                                animation  : 'scale',
                                duration   : '.3s',
                            })
                        ;

                        $('.trash-favorite-content')
                            .transition({
                                animation  : 'scale',
                                duration   : '.3s',
                            })
                        ;
                    }
                })
            ;
        }

        var item = $("#favorite-segment").find("#" + city_id);

        item.transition({
            animation  : 'scale',
            onComplete: function () {
                item.remove();
            }
        });
    });

    $('#favorite-segment').on('click', '.trash-favorite-icon-action-btn', function() {
        var city_id = $(this).find(".city-id").text();
        console.log(city_id);

        var storage = $.localStorage;
        // exists
        if (storage.isSet(city_id)) {
            storage.remove(city_id);
        }

        var item = $("#favorite-segment").find("#" + city_id);
        console.log(item);

        item.transition({
            animation  : 'scale',
            onComplete: function () {
                item.remove();

                if (city_id === $("#card-show-weather").find(".city-id").text()) {
                    $("#card-show-weather").find(".favorite-icon-action-btn").removeClass("red");
                    $("#card-show-weather").find(".trash-favorite-icon-action-btn-").addClass("hidden");
                    $("#card-show-weather").find(".favorite-text-action").text("Favorite City");
                }
            }
        });
    });
});