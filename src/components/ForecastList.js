import React from "react";
import ForecastBlock from "./ForecastBlock";

function ForecastList({ dailyForecast }) {
  dailyForecast = dailyForecast.filter((forecast, i) => i > 0); //Remove current day from forecast
  return (
    <div>
      <h2 className="text-2xl ml-4">7 Day forecast</h2>
      <div className="flex flex-wrap ">
        {dailyForecast.map((forecast) => {
          const { dt, humidity } = forecast;
          const temp = forecast.temp.day;
          const feels_like = forecast.feels_like.day;
          const { description, icon } = forecast.weather[0];

          return (
            <div className="m-4">
              <ForecastBlock
                key={Number(dt)}
                dt={dt}
                humidity={humidity}
                temp={temp}
                feels_like={feels_like}
                description={description}
                icon={icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ForecastList;
