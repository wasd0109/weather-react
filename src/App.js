import React from "react";
import ForecastList from "./components/ForecastList";
import CurrentBlock from "./components/CurrentBlock";
import "./App.css";
import "./output.css";
const __OPEN_WEATHER_MAP_KEY = "";
const __LOCATION__IQ_KEY = "";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: "",
      longitude: "",
      data: {},
      current: {},
      dailyForecast: {},
      country: "",
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
      this.getCountry
    );
  }

  getCountry() {
    const { latitude, longitude } = this.state;
    fetch(
      `https://us1.locationiq.com/v1/reverse.php?key=${__LOCATION__IQ_KEY}&lat=${latitude}&lon=${longitude}&format=json`
    )
      .then((resp) => resp.json())
      .then((data) =>
        this.setState({ country: data.address.country }, this.getWeather)
      );
  }

  getWeather() {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.latitude}&lon=${this.state.longitude}&exclude=minutely,hourly&appid=${__OPEN_WEATHER_MAP_KEY}`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          current: data.current,
          dailyForecast: data.daily,
        })
      );
  }

  componentDidMount() {
    this.getGeolocation();
  }

  render() {
    const { current, dailyForecast, country } = this.state;
    if (Object.entries(current).length) {
      return (
        <div>
          <h1 className="text-2xl">
            Weather in <span className="m-4 text-4xl">{country}</span>
          </h1>
          <CurrentBlock current={current}></CurrentBlock>
          <ForecastList dailyForecast={dailyForecast} />
        </div>
      );
    } else
      return (
        <div>
          <h1>Loading</h1>
        </div>
      );
  }
}

export default App;
