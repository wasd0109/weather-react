import React from "react";
import ForecastBlock from "./ForecastBlock";

function ForecastList({ data, current, dailyForecast, isLoading }) {
  if (Object.entries(data).length) {
    const { timezone_offset } = data;
    const { dt, temp, feels_like, humidity, weather } = current;
    const { description, icon } = weather[0];
    return (
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
  } else
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
}

export default ForecastList;
