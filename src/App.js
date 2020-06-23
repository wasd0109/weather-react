import React from "react";
import ForecastList from "./components/ForecastList";
import CurrentBlock from "./components/CurrentBlock";
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
          current: data.current,
          dailyForecast: data.daily,
        })
      );
  }

  componentDidMount() {
    this.getGeolocation();
  }

  render() {
    const { current, dailyForecast } = this.state;
    if (Object.entries(current).length) {
      return (
        <div>
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
