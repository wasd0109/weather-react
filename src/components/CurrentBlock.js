import React from "react";
import moment from "moment";

//dt,timezone_offset, temp,feels_like,humidity,weather.main/.description/.icon

function CurrentBlock({ timezone_offset, current }) {
  const { dt, temp, feels_like, humidity, weather } = current;
  const { description, icon } = weather[0];
  const monthOffset = 1;
  let month = (
    "0" +
    (moment.unix(dt + timezone_offset).month() + monthOffset)
  ).slice(-2);
  let date = ("0" + moment.unix(dt + timezone_offset).date()).slice(-2);
  const kelvinToCelsius = -273.15;
  const tempCelsius = temp + kelvinToCelsius;
  const feels_likeCelsius = feels_like + kelvinToCelsius;
  return (
    <div className="flex">
      <div className="max-w-lg rounded overflow-hidden shadow-lg bg-blue-100 p-4">
        <div className="flex">
          <div>
            <img
              className="w-32"
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="Current Weather"
            />
          </div>

          <div className="justify-end m-0">
            <p className="text-3xl">{`${tempCelsius.toFixed(1)}°C`}</p>
            <p className="text-sm m-0">Feels Like:</p>
            <p className="text-2xl">{`${feels_likeCelsius.toFixed(1)}°C`}</p>
            <p className=" text-3xl m-0">{`${month}/${date}`}</p>
          </div>
        </div>

        <p className="ml-6">
          Weather: <span className="text-xl capitalize">{description}</span>
        </p>

        <p className="ml-6">
          Humidity: <span className="text-xl">{`${humidity}%`}</span>
        </p>
      </div>
    </div>
  );
}

export default CurrentBlock;
