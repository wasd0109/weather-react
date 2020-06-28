import React from "react";
import moment from "moment";

const blockColor = (main) => {
  const weather = main.toLowerCase();
  switch (String(weather)) {
    case "clear":
      return "bg-blue-200";
    case "rain":
    case "drizzle":
      return "bg-gray-500";
    case "thunderstorm":
      return "bg-yellow-300";
    case "snow":
      return "bg-white";
    case "fog":
      return "bg-gray-300";
    default:
      return "bg-gray-200";
  }
};

function ForecastBlock({
  dt,
  temp,
  feels_like,
  humidity,
  description,
  icon,
  onBlockClick,
  id,
  main,
}) {
  const monthOffset = 1;
  const kelvinToCelsius = -273.15;
  const date = moment.unix(dt);
  const dateString = `${("0" + (date.month() + monthOffset)).slice(-2)}/${(
    "0" + date.date()
  ).slice(-2)}`;
  const backgroundColor = blockColor(main);
  const tempCelsius = (temp + kelvinToCelsius).toFixed(1);
  const feels_likeCelsius = (feels_like + kelvinToCelsius).toFixed(1);
  return (
    <button
      className="transform hover:scale-105 m-4"
      onClick={onBlockClick}
      id={id}
    >
      <div className="flex center">
        <div
          className={`max-w-lg rounded overflow-hidden shadow-lg ${backgroundColor} p-4`}
        >
          <div className="flex  mr-2">
            <div>
              <img
                className="w-32"
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="Current Weather"
              />
            </div>

            <div className="justify-end m-0">
              <p className="text-3xl">{`${tempCelsius}°C`}</p>
              <p className="text-sm m-0">Feels Like:</p>
              <p className="text-2xl">{`${feels_likeCelsius}°C`}</p>
              <p className="text-3xl m-0">{`${dateString}`}</p>
            </div>
          </div>

          <p>
            Weather: <span className="text-lg capitalize ">{description}</span>
          </p>

          <p>
            Humidity: <span className="text-xl">{`${humidity}%`}</span>
          </p>
        </div>
      </div>
    </button>
  );
}

export default ForecastBlock;
