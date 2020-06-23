import React from "react";
import ForecastBlock from "./ForecastBlock";

function ForecastList({ dailyForecast, onBlockClick }) {
  dailyForecast = dailyForecast.filter((forecast, i) => i > 0);
  return (
    <div>
      <h2 className="text-2xl ml-4">7 Day forecast</h2>
      <div className="md:flex md:flex-wrap ">
        {dailyForecast.map((forecast, i) => {
          const { dt, humidity } = forecast;
          const temp = forecast.temp.day;
          const feels_like = forecast.feels_like.day;
          const { description, icon } = forecast.weather[0];

          return (
            <div className="m-4">
              <ForecastBlock
                id={i + 1}
                key={Number(dt)}
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
    </div>
  );
}

export default ForecastList;
