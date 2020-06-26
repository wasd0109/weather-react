import React from "react";
import ForecastBlock from "./ForecastBlock";

function ForecastList({ dailyForecast, onBlockClick }) {
  dailyForecast = dailyForecast.filter((forecast, i) => i > 0); //Remove today from list
  if (dailyForecast !== undefined) {
    return (
      <div className="md:flex md:flex-wrap">
        {dailyForecast.map((forecast, i) => {
          const { dt, humidity } = forecast;
          const temp = forecast.temp.day;
          const feels_like = forecast.feels_like.day;
          const { description, icon, main } = forecast.weather[0];
          return (
            <div key={dt}>
              <ForecastBlock
                className="md:flex md:flex-wrap "
                main={main}
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
  return (
    <div className="flex center">
      <div
        className={`max-w-lg rounded overflow-hidden shadow-lg bg-red-500 p-2 py-32 m-4 mb-32`}
      >
        <h2>Something went wrong</h2>
        <p>If possible please report issues to</p>
        <a href="mailto:wasd0109.dev@gmail.com" className="text-white">
          wasd0109.dev@gmail.com
        </a>
      </div>
    </div>
  );
}

export default ForecastList;
