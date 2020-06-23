import React from "react";
import ForecastBlock from "./ForecastBlock";

function ForecastList({ dailyForecast, timezone_offset }) {
  dailyForecast = dailyForecast.filter((forecast, i) => i > 1); //Remove first two day (yesterday and today forecast)
  return dailyForecast.map((forecast, i) => {
    const { dt, humidity } = forecast;
    const temp = forecast.temp.day;
    const feels_like = forecast.feels_like.day;
    const { description, icon } = forecast.weather[0];
    console.log(description);

    return (
      <div>
        <ForecastBlock
          dt={dt}
          timezone_offset={timezone_offset}
          humidity={humidity}
          temp={temp}
          feels_like={feels_like}
          description={description}
          icon={icon}
        />
      </div>
    );
  });
}

export default ForecastList;
