import { Component } from "preact";

export default class CityCard extends Component {
  render({ id, icon, name, temp, humidity, wind, favorite, handleFavorite }) {
    return (
      <div>
        <div className="city-card-item">
          <div className="city-card-item-col temp-col">
            <span>
              {temp}
              °C
            </span>
            <span>{name}</span>
          </div>
          <div className="city-card-item-col no-bg">
            <div className="default-padding city-card-item-col-img">
              <div className="city-card-item-icon">
                <img
                  src={`http://openweathermap.org/img/w/${icon}.png`}
                  alt=""
                  width="50"
                  height="50"
                />
              </div>
            </div>
            <div className="city-card-stats default-padding">
              <div>
                <span>{humidity}%</span>
                <span>Umidade</span>
              </div>
              <div>
                <span>{wind} km/h</span>
                <span>vento</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          {favorite && (
            <button onClick={() => handleFavorite(this.props)}>Remove</button>
          )}
          {!favorite && (
            <button onClick={() => handleFavorite(this.props)}>Add</button>
          )}
        </div>
      </div>
    );
  }
}
