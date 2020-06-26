import React from "react";
import moment from "moment";

//dt,timezone_offset, temp,feels_like,humidity,weather.main/.description/.icon

const blockColor = (main) => {
  const weather = main.toLowerCase();
  if (weather.includes("clear")) {
    return "bg-blue-200";
  } else if (weather.includes("rain") || weather.includes("drizzle")) {
    return "bg-gray-500";
  } else if (weather.includes("thunderstorm")) {
    return "bg-yellow-300";
  } else if (weather.includes("snow")) {
    return "bg-white";
  } else if (weather.includes("fog")) {
    return "bg-gray-300";
  } else {
    return "bg-gray-200";
  }
};

function CurrentBlock({ current, onBlockClick }) {
  const { dt, temp, feels_like, humidity, weather } = current;
  const { description, icon, main } = weather[0];
  const monthOffset = 1;
  const month = ("0" + (moment.unix(dt).month() + monthOffset)).slice(-2);
  const date = ("0" + moment.unix(dt).date()).slice(-2);
  const kelvinToCelsius = -273.15;
  const tempCelsius = temp + kelvinToCelsius;
  const feels_likeCelsius = feels_like + kelvinToCelsius;
  const backgroundColor = blockColor(main);
  return (
    <button
      className="transform hover:scale-105 m-4 block  "
      onClick={onBlockClick}
      id="0"
    >
      <div
        className={`max-w-lg rounded overflow-hidden shadow-lg ${backgroundColor} p-4`}
      >
        <div className="flex mr-2">
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

        <p className="">
          Weather: <span className="text-lg capitalize">{description}</span>
        </p>

        <p className="">
          Humidity: <span className="text-xl">{`${humidity}%`}</span>
        </p>
      </div>
    </button>
  );
}

export default CurrentBlock;
