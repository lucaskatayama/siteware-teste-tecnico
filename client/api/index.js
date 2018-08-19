const API_URL = (path = "weather") =>
  `http://api.openweathermap.org/data/2.5/${path}?units=metric`;
const API_KEY = "xxx";
const API_V1 = "http://localhost:5000/api/v1/";

const parseCardData = data => ({
  id: data.id,
  name: data.name,
  temp: data.main.temp,
  humidity: data.main.humidity,
  wind: data.wind.speed,
  icon: data.weather[0].icon
});

export const getWeather = city =>
  fetch(`${API_URL()}&q=${city}&units=metric&appid=${API_KEY}`, {
    method: "GET"
  })
    .then(resp => resp.json())
    .then(parseCardData);

export const getFavoritesWeather = cityListID =>
  fetch(
    `${API_URL("group")}&id=${cityListID.join(
      ","
    )}&units=metric&appid=${API_KEY}`,
    {
      method: "GET"
    }
  )
    .then(resp => resp.json())
    .then(({ list }) => list.map(parseCardData));

export const getFavoritesFromDB = city =>
  fetch(`${API_V1}favorites`, {
    method: "GET"
  })
    .then(resp => resp.json())
    .then(data => data.map(d => d.id));

export const saveFavorite = id =>
  fetch(`${API_V1}favorites`, {
    method: "POST",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({ id })
  }).then(resp => resp.json());

export const removeFavorite = id =>
  fetch(`${API_V1}favorites/${id}`, {
    method: "DELETE"
  }).then(resp => resp.json());
