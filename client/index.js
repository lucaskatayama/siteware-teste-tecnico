import "./style";
import { Component } from "preact";
import {
  getWeather,
  getFavoritesWeather,
  getFavoritesFromDB,
  saveFavorite,
  removeFavorite
} from "./api/";
import { CityCard } from "./components/";

export default class App extends Component {
  state = {
    city: "",
    searchCity: null,
    favorites: []
  };

  handleCityChange = e => {
    const city = e.target.value;
    this.setState({ city });
  };

  handleSearch = async e => {
    const { city } = this.state;

    try {
      const data = await getWeather(city);
      this.setState({ searchCity: data });
    } catch (e) {
      console.error(`could not get data for city ${city}: `, e);
    }
  };

  saveFavorite = async fav => {
    try {
      const data = await saveFavorite(fav.id);
      this.setState({
        favorites: [...this.state.favorites, fav],
        searchCity: null
      });
    } catch (e) {
      console.error(`could not save favorite id ${fav.id}: `, e);
    }
  };

  removeFavorite = async ({ id }) => {
    try {
      await removeFavorite(id);

      const favorites = this.state.favorites.filter(fav => fav.id !== id);
      this.setState({ favorites });
    } catch (e) {
      console.error(`could not remove favorite id ${id}: `, e);
    }
  };

  async componentDidMount() {
    try {
      const favs = await getFavoritesFromDB();

      if (favs.length > 0) {
        const favorites = await getFavoritesWeather(favs);
        this.setState({ favorites });
      }
    } catch (e) {
      console.error("could not get favorites: ", e);
    }
  }

  render() {
    const { city, searchCity, favorites } = this.state;
    return (
      <div className="wrap">
        <div className="wrapper">
          <div>
            {searchCity && (
              <div className="search-city-card">
                <CityCard handleFavorite={this.saveFavorite} {...searchCity} />
              </div>
            )}
            <div className="search">
              <input
                type="text"
                placeholder="Cidade"
                value={city}
                onChange={this.handleCityChange}
              />
              <button onClick={this.handleSearch}>pesquisar</button>
            </div>
          </div>
          {favorites.length > 0 && (
            <div>
              <h2>Favorites</h2>
              <div className="city-card-list">
                {favorites.map(fav => (
                  <CityCard
                    {...fav}
                    handleFavorite={this.removeFavorite}
                    favorite={true}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
