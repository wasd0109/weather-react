import React from "react";
import ForecastList from "./components/ForecastList";
import CurrentBlock from "./components/CurrentBlock";
import DetailedPage from "./components/DetailedPage";
import LoadingScreen from "./components/LoadingScreen";
import SearchBar from "./components/SearchBar";
import "./App.css";
import "./output.css";
import githubIcon from "./assets/github.png";
import Warning from "./components/Warning";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: "35.6828387",
      longitude: "139.7594549",
      current: {},
      dailyForecast: {},
      city: "",
      route: "home",
      detailHidden: "true",
      searchCity: "",
      locationDisabled: false,
    };
  }

  getGeolocation() {
    const { latitude, longitude } = this.state;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.setGeolocation(position.coords),
        () => {
          this.setGeolocation({
            latitude: latitude,
            longitude: longitude,
          });
          this.setState({ locationDisabled: true });
        }
      );
    }
  }

  setGeolocation(position) {
    const { latitude, longitude } = position;
    this.setState(
      {
        latitude: latitude,
        longitude: longitude,
      },
      this.getCity
    );
  }

  getCity() {
    const { latitude, longitude } = this.state;
    fetch(
      `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&lat=${latitude}&lon=${longitude}&format=json`
    )
      .then((resp) => resp.json())
      .then((data) =>
        this.setState(
          {
            city: data.address.city ? data.address.city : data.address.country,
          },
          this.getWeather
        )
      );
  }

  getCityCoords() {
    const { searchCity } = this.state;
    fetch(
      `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${searchCity}&format=json`
    )
      .then((resp) => resp.json())
      .then((data) =>
        this.setState(
          {
            city: data[0].display_name,
            latitude: data[0].lat,
            longitude: data[0].lon,
          },
          this.getWeather
        )
      )
      .catch((err) => console.log(err));
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

  onSearchChange = (event) => {
    this.setState({ searchCity: event.target.value });
  };

  onSearchClick = () => {
    const { searchCity } = this.state;
    if (searchCity.length !== 0) {
      this.getCityCoords();
    }
  };

  onSearchEnterKey = (event) => {
    const { searchCity } = this.state;
    if (event.which === 13 && searchCity.length !== 0) {
      this.getCityCoords();
    }
  };

  componentDidMount() {
    this.getGeolocation();
  }

  render() {
    const {
      current,
      dailyForecast,
      city,
      route,
      detailHidden,
      locationDisabled,
    } = this.state;
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
            Weather in <span className="text-4xl">{city}</span>
          </h1>
          <SearchBar
            onSearchChange={this.onSearchChange}
            onSearchClick={this.onSearchClick}
            onSearchEnterKey={this.onSearchEnterKey}
          />
          <Warning locationDisabled={locationDisabled} />
          <CurrentBlock
            className="block"
            current={current}
            onBlockClick={this.onBlockClick}
          ></CurrentBlock>
          <h2 className="text-2xl ml-4">7 Day forecast</h2>
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
          <LoadingScreen type="spin" color="#2a4365" />
        </div>
      );
  }
}

export default App;
