import React from "react";
import moment from "moment";

//dt,timezone_offset, temp,feels_like,humidity,weather.main/.description/.icon

function CurrentBlock({
  dt,
  timezone_offset,
  temp,
  feels_like,
  humidity,
  weatherDescription,
  weatherIcon,
}) {
  const monthOffset = 1;
  let month = ("0" + (moment.unix(dt).month() + monthOffset)).slice(-2);
  let date = ("0" + moment.unix(dt).date()).slice(-2);
  const kelvinToCelsius = -273.15;
  temp += kelvinToCelsius;
  feels_like += kelvinToCelsius;
  return (
    <div className="flex">
      <div className="max-w-lg rounded overflow-hidden shadow-lg bg-blue-100 p-4">
        <div className="flex">
          <div>
            <img
              className="w-32"
              src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              alt="Current Weather"
            />
          </div>

          <div className="justify-end m-0">
            <p className="text-3xl">{`${temp.toFixed(1)}°C`}</p>
            <p className="text-sm m-0">Feels Like:</p>
            <p className="text-2xl">{`${feels_like.toFixed(1)}°C`}</p>
            <p className=" text-3xl m-0">{`${month}/${date}`}</p>
          </div>
        </div>

        <p className="ml-6">
          Weather:{" "}
          <span className="text-xl capitalize">{weatherDescription}</span>
        </p>

        <p className="ml-6">
          Humidity: <span className="text-xl">{`${humidity}%`}</span>
        </p>
      </div>
    </div>
  );
}

export default CurrentBlock;
