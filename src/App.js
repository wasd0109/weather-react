import React from "react";
import ForecastBlock from "./components/ForecastBlock";
import "./App.css";
import "./output.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: "",
      longitude: "",
      data: {},
      current: {},
      currentWeather: {},
      dailyForecast: {},
    };
  }

  getGeolocation() {
    const { latitude, longitude } = this.state;
    if (navigator.geolocation && !latitude && !longitude) {
      navigator.geolocation.getCurrentPosition((position) =>
        this.setGeolocation(position)
      );
    }
  }

  setGeolocation(position) {
    this.setState(
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      this.getWeather
    );
  }

  getWeather() {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.latitude}&lon=${this.state.longitude}&exclude=minutely,hourly&appid=648f9c780527e242ca6a26f3b1b28467`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          data: data,
          current: data.current,
          currentWeather: data.current.weather[0],
          dailyForecast: data.daily,
        })
      );
  }

  componentDidMount() {
    this.getGeolocation();
  }

  render() {
    const { timezone_offset } = this.state.data;
    const { dt, temp, feels_like, humidity } = this.state.current;
    const { description, icon } = this.state.currentWeather;

    return !Object.entries(this.state.data).length ? (
      <h1>Loading</h1>
    ) : (
      <ForecastBlock
        dt={dt}
        timezone_offset={timezone_offset}
        temp={temp}
        feels_like={feels_like}
        humidity={humidity}
        weatherDescription={description}
        weatherIcon={icon}
      />
    );
  }
}

export default App;
