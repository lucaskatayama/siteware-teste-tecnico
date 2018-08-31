$(document).ready(function () {
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
        }

        // exists
        else {

        }
    });

    $('#card-show-weather .trash-favorite-icon-action-btn').on('click', function() {
        var template = $("#card-show-weather");
        var city_id = template.find(".city-id").text();
        var name = template.find(".card-city-name").text();

        var storage = $.localStorage;
        // exists
        if (storage.isSet(city_id)) {
            console.log(storage.get(city_id));
            storage.remove(city_id);
            console.log(storage.get(city_id));

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
    });
});