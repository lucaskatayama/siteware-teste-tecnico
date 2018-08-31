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
                    console.log(citiesResponse);
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
                        console.log(item)
                        console.log(item.sys)
                        console.log(item.sys.country)
                        response.results[country].results.push({
                            title: item.name,
                            description: item.weather[0].description,
                        });
                    });

                    return response;
                }
            }
        })
    ;
});