import React from "react";
import ForecastList from "./components/ForecastList";
import CurrentBlock from "./components/CurrentBlock";
import DetailedPage from "./components/DetailedPage";
import LoadingScreen from "./components/LoadingScreen";
import SearchBar from "./components/SearchBar";
import Alert from "./components/Alert";
import Warning from "./components/Warning";
import "./App.css";
import "./output.css";
import githubIcon from "./assets/github.png";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: "",
      longitude: "",
      defaultLatitude: "35.6828387",
      defaultLongitude: "139.7594549",
      current: {},
      dailyForecast: {},
      city: "",
      route: "home",
      detailHidden: "true",
      searchCity: "",
      locationDisabled: false,
      loaded: false,
      backgroundPath: "",
    };
  }

  getGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.setGeolocation(position.coords),
        () => {
          this.getCityName();
          this.setState({ locationDisabled: true });
        }
      );
    }
  }

  setGeolocation(coords) {
    const { latitude, longitude } = coords;
    this.setState(
      {
        latitude: latitude,
        longitude: longitude,
      },
      () => this.getCityName(latitude, longitude)
    );
  }

  // getCityName(latitude, longitude) {
  //   fetch(
  //     `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&lat=${latitude}&lon=${longitude}&format=json`
  //   )
  //     .then((resp) => resp.json())
  //     .then((data) =>
  //       this.setState(
  //         {
  //           city: data.address.city ? data.address.city : data.address.country,
  //         },
  //         () => this.getWeather(latitude, longitude)
  //       )
  //     );
  // }

  async getCityName(
    latitude = this.state.defaultLatitude,
    longitude = this.state.defaultLongitude
  ) {
    let resp = await fetch(
      `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&lat=${latitude}&lon=${longitude}&format=json`
    );
    let data = await resp.json();
    const { city, country } = data.address;

    this.setState(
      {
        city: city ? city : country,
      },
      () => this.getWeather(latitude, longitude)
    );
  }

  // getCityCoords(searchCity) {
  //   fetch(
  //     `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${searchCity}&format=json`
  //   )
  //     .then((resp) => resp.json())
  //     .then((data) =>
  //       this.setState(
  //         {
  //           city: data[0].display_name,
  //           latitude: data[0].lat,
  //           longitude: data[0].lon,
  //         },
  //         this.getWeather(data[0].lat, data[0].lon)
  //       )
  //     )
  //     .catch((err) => console.log(err));
  // }

  async getCityCoords(searchCity) {
    try {
      let resp = await fetch(
        `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${searchCity}&format=json`
      );
      let data = await resp.json();
      const { display_name, lat, lon } = data[0];
      this.setState(
        {
          city: display_name,
          latitude: lat,
          longitude: lon,
        },
        () => this.getWeather(lat, lon)
      );
    } catch (err) {
      this.setState({ searchError: true });
    }
  }

  // getWeather(latitude, longitude) {
  //   fetch(
  //     `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_KEY}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) =>
  //       this.setState(
  //         {
  //           current: data.current,
  //           dailyForecast: data.daily,
  //           loaded: true,
  //         },
  //         () => this.decideBackground(data.current)
  //       )
  //     );
  // }

  async getWeather(latitude, longitude) {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_KEY}`
      );
      let data = await response.json();
      const { current, daily } = data;
      this.setState(
        {
          current: current,
          dailyForecast: daily,
          loaded: true,
        },
        () => this.decideBackground(current)
      );
    } catch (err) {
      console.log(err);
    }
  }

  decideBackground(current) {
    const weather = current.weather[0].main.toLowerCase();
    let backgroundPath = "";
    switch (String(weather)) {
      case "clear":
        backgroundPath = "https://wallpaper.dog/large/965994.jpg";
        break;
      case "rain":
      case "drizzle":
        backgroundPath =
          "https://avatars.mds.yandex.net/get-pdb/1342781/55b90480-4af4-49ae-90ea-4c7a7de5f870/orig";
        break;
      case "thunderstorm":
        backgroundPath =
          "https://upload.wikimedia.org/wikipedia/commons/8/82/Lightning_Pritzerbe_01_%28MK%29.jpg";
        break;
      case "snow":
        backgroundPath =
          "https://wordpress.accuweather.com/wp-content/uploads/2020/05/cropped-EXkyP-GWoAIHUxE.jpg";
        break;
      case "fog":
        backgroundPath =
          "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/fog--mist/fog-in-the-treetops.jpg";
        break;
      default:
        backgroundPath =
          "https://s7d2.scene7.com/is/image/TWCNews/clouds_jpg_jpg-2";
    }
    this.setState({ backgroundPath: backgroundPath });
  }

  onBlockClick = (event) => {
    this.setState({ route: event.currentTarget.id });
  };

  onPopupClick = () => {
    this.setState({ route: "home" });
  };
  onButtonClick = () => {
    this.setState({ route: "home" });
  };

  onSearchChange = (event) => {
    this.setState({ searchCity: event.target.value });
  };

  onSearchClick = () => {
    const { searchCity } = this.state;
    console.log(searchCity);
    if (searchCity.length !== 0) {
      this.getCityCoords(searchCity);
    }
  };

  onSearchEnterKey = (event) => {
    const { searchCity } = this.state;
    if (event.which === 13 && searchCity.length !== 0) {
      this.getCityCoords(searchCity);
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
      loaded,
      backgroundPath,
      searchError,
    } = this.state;
    if (loaded) {
      return (
        <div
          className="center m-0"
          id="container"
          style={{
            backgroundImage: `url("${backgroundPath}")`,
            backgroundSize: "cover",
          }}
        >
          <DetailedPage
            route={route}
            dailyForecast={dailyForecast}
            hidden={detailHidden}
            onPopupClick={this.onPopupClick}
            onButtonClick={this.onButtonClick}
          />
          <h1 className="ml-4 md:text-2xl">
            Weather in <span className="text-4xl">{city}</span>
          </h1>
          <SearchBar
            onSearchChange={this.onSearchChange}
            onSearchClick={this.onSearchClick}
            onSearchEnterKey={this.onSearchEnterKey}
          />
          <Warning
            messageTitle={"Search Error"}
            message={"Location not found"}
            condition={searchError}
          />
          <Alert
            messageTitle={"Location Service Disabled"}
            message={"Please enable it to see forecasts of current location"}
            condition={locationDisabled}
          />
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
          <footer className="text-center text-white bg-black text-lg">
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
