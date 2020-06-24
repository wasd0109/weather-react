import React from "react";
import ForecastList from "./components/ForecastList";
import CurrentBlock from "./components/CurrentBlock";
import DetailedPage from "./components/DetailedPage";
import "./App.css";
import "./output.css";
import githubIcon from "./assets/github.png";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: "",
      longitude: "",
      current: {},
      dailyForecast: {},
      country: "",
      route: "home",
      detailHidden: "true",
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
      `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&lat=${latitude}&lon=${longitude}&format=json`
    )
      .then((resp) => resp.json())
      .then((data) =>
        this.setState({ country: data.address.country }, this.getWeather)
      );
  }

  getWeather() {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.latitude}&lon=${this.state.longitude}&exclude=minutely,hourly&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_KEY}`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          current: data.current,
          dailyForecast: data.daily,
        })
      );
  }

  onBlockClick = (event) => {
    this.setState({ route: event.currentTarget.id });
  };

  onPopupClick = () => {
    this.setState({ route: "home" });
  };

  componentDidMount() {
    this.getGeolocation();
  }

  render() {
    const { current, dailyForecast, country, route, detailHidden } = this.state;

    if (Object.entries(current).length) {
      return (
        <div className="center">
          <DetailedPage
            route={route}
            dailyForecast={dailyForecast}
            hidden={detailHidden}
            onPopupClick={this.onPopupClick}
          />
          <h1 className="m-4 md:text-2xl">
            Weather in <span className="text-4xl">{country}</span>
          </h1>
          <CurrentBlock
            className="block"
            current={current}
            onBlockClick={this.onBlockClick}
          ></CurrentBlock>

          <ForecastList
            dailyForecast={dailyForecast}
            onBlockClick={this.onBlockClick}
          />
          <footer className="text-center bg-blue-400 text-lg">
            by Ken Cheung
            <a href="https://github.com/wasd0109">
              <img
                className="w-6 inline mx-4"
                src={githubIcon}
                alt="github icon"
              />
            </a>
          </footer>
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
