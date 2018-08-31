$(document).ready(function () {
    $('#search-for-weather')
        .search({
            type          : 'category',
            minCharacters : 3,
            apiSettings: {
                url: '//api.openweathermap.org/data/2.5/find?q={query}' +
                '&type=like' +
                '&units=metric' +
                '&appid=232c8c2ef0ee39175db1823b9fe7cc1b',
                onResponse: function (citiesResponse) {
                    var response = { // response as the items on the front-end
                        results: {}
                    };

                    // here citiesResponse.items = $results['items']
                    $.each(citiesResponse.list, function (index, item) {
                        // here country = Category if you wish to have the results in that format
                        var country = item.sys.country.toUpperCase() || 'Unknown',
                            maxResults = 5;

                        if (index >= maxResults)
                            return false;

                        if (response.results[country] === undefined) {
                            response.results[country] = {
                                name: country,
                                results: []
                            };
                        }

                        response.results[country].results.push({
                            title: item.name,
                            description: item.weather[0].description,
                            object: item
                        });
                    });

                    return response;
                },
            },
            onSelect: function (result,response) {
                var weather = result.object;
                var template = $("#card-show-weather");
                var name = template.find(".card-city-name");
                var country = template.find(".card-country");
                var humidity = template.find(".card-humidity");
                var temperature = template.find(".card-temperature");
                var temperature_max = template.find(".card-temperature-max");
                var svgImg = template.find(".card-image-svg");
                var main = template.find(".card-main");
                var mainDescription = template.find(".card-main-description");
                var wind = template.find(".card-wind");
                var id = template.find(".city-id");

                name.text(weather.name);
                country.text(weather.sys.country);
                humidity.text(Math.round(weather.main.humidity) + "%");
                temperature.text(Math.round(weather.main.temp) + "c");
                temperature_max.text(Math.round(weather.main.temp_max) + "c");
                svgImg.attr("src", getIconFromWeather(weather.weather[0].icon));
                main.text(weather.weather[0].main);
                mainDescription.text(weather.weather[0].description);
                wind.text(weather.wind.speed);
                id.text(weather['id']);
                console.log(weather['id']);

                // reset
                if ($('#card-show-weather').hasClass('hidden')) {
                    $('#card-show-weather').transition('fade');
                }

                var storage = $.localStorage;
                if (!storage.isSet(weather['id'])) {
                    template.find(".favorite-text-action").text("Favorite City");
                    template.find(".favorite-icon-action-btn").removeClass("red");
                    template.find(".trash-favorite-content").hide();
                }
                else {
                    template.find(".favorite-text-action").text("Favorited");
                    template.find(".favorite-icon-action-btn").addClass("red");
                    template.find(".trash-favorite-content").removeClass("hidden");
                }

                return true;
            }
        })
    ;
});

/**
 * Reference here:
 * https://openweathermap.org/weather-conditions
 *
 * @param iconName name of the icon from API
 */
function getIconFromWeather(iconName) {
    var icon_path = "/assets/rainicons/animated/";

    switch(iconName) {
        // Days Icons
        case "01d":
            icon_path += "day.svg";
            break;
        case "02d":
            icon_path += "cloudy-day-1.svg";
            break;
        case "03d":
            icon_path += "cloudy.svg";
            break;
        case "04d":
            icon_path += "rainy-5.svg";
            break;
        case "09d":
            icon_path += "rainy-6.svg";
            break;
        case "10d":
            icon_path += "rainy-1.svg";
            break;
        case "11d":
            icon_path += "thunder.svg";
            break;
        case "13d":
            icon_path += "snowy-6.svg";
            break;

            //Night
        case "01n":
            icon_path += "night.svg";
            break;
        case "02n":
            icon_path += "cloudy-night-1.svg";
            break;
        case "03n":
            icon_path += "cloudy.svg";
            break;
        case "04n":
            icon_path += "rainy-5.svg";
            break;
        case "09n":
            icon_path += "rainy-6.svg";
            break;
        case "10n":
            icon_path += "rainy-6.svg";
            break;
        case "11n":
            icon_path += "thunder.svg";
            break;
        case "13n":
            icon_path += "snowy-6.svg";
            break;

        default:
            icon_path += "cloudy.svg";
            break;
    }

    return icon_path;
}