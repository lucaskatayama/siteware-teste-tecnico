<div class="ui fluid card" id="card-show-weather">
    <div class="content">
        <span class="card-city-name">City name</span>
        <span class="right floated meta card-country">Country Code</span>
    </div>
    <div class="image">
        <img class="card-image-svg" src="{{ asset("assets/rainicons/animated/cloudy.svg") }}">
    </div>
    <div class="content">
        <a class="header card-main">Weather status</a>
        <div class="meta">
            <span class="date card-main-description">Weather description</span>
        </div>
        <br>
        <div class="ui stackable three column grid">
            <div class="column">
                <div class="ui basic segment force-center">
                    <div class="ui mini statistic">
                        <div class="value">
                            <i class="umbrella icon"></i>
                            <span class="card-humidity">5</span>
                        </div>
                        <div class="mini label">
                            Humidity
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="ui basic segment force-center">
                    <div class="ui mini statistic">
                        <div class="value">
                            <i class="thermometer half icon"></i>
                            <span class="card-temperature">5</span>
                        </div>
                        <div class="mini label">
                            Celsius
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="ui basic segment force-center">
                    <div class="ui mini statistic">
                        <div class="value">
                            <i class="telegram plane icon"></i>
                            <span class="card-wind">5</span>
                        </div>
                        <div class="mini label">
                             Wind
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="extra content">
        <span class="left trash trash-favorite-content hidden">
          <i class="trash icon link trash-favorite-icon-action-btn"></i>
          <span class="trash-favorite-text-action">Remove</span>
        </span>

        <span class="right floated star favorite-content">
          <i class="heart icon link favorite-icon-action-btn"></i>
          <span class="favorite-text-action">Favorite city</span>
        </span>
    </div>
    <span class="city-id hidden"></span>
</div>