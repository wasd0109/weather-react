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
      `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.latitude}&lon=${this.state.longitude}&exclude=minutely,hourly,daily&appid=648f9c780527e242ca6a26f3b1b28467`
    )
      .then((response) => response.json())
      .then(console.log);
  }

  componentDidMount() {
    this.getGeolocation();
  }

  render() {
    return (
      <ForecastBlock
        dt="1588935779"
        timezone_offset="-18000"
        temp="16.75"
        feels_like="16.07"
        humidity="93"
        weatherDescription="moderate rain"
        weatherIcon="10n"
      />
    );
  }
}

export default App;
