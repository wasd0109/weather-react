import React from "react";
import ForecastList from "./components/ForecastList";
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
      isLoading: true,
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
          dailyForecast: data.daily,
        })
      );
  }

  componentDidMount() {
    this.getGeolocation();
    this.setState({ isLoading: false });
  }

  render() {
    const { data, current, dailyForecast, isLoading } = this.state;
    return (
      <ForecastList
        data={data}
        current={current}
        dailyForecast={dailyForecast}
      />
    );
  }
}

export default App;
