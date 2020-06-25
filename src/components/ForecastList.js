import React from "react";
import ForecastBlock from "./ForecastBlock";

function ForecastList({ dailyForecast, onBlockClick }) {
  dailyForecast = dailyForecast.filter((forecast, i) => i > 0); //Remove today from list
  return (
    <div className="md:flex md:flex-wrap">
      {dailyForecast.map((forecast, i) => {
        const { dt, humidity } = forecast;
        const temp = forecast.temp.day;
        const feels_like = forecast.feels_like.day;
        const { description, icon } = forecast.weather[0];
        return (
          <div key={dt}>
            <ForecastBlock
              className="md:flex md:flex-wrap "
              id={i + 1}
              dt={dt}
              humidity={humidity}
              temp={temp}
              feels_like={feels_like}
              description={description}
              icon={icon}
              onBlockClick={onBlockClick}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ForecastList;
