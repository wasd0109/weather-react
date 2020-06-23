import React from "react";
import moment from "moment";

// const { timezone_offset } = data;
// const { dt, temp, feels_like, humidity, weather } = current;
// const { description, icon } = weather[0];
// return (
//   <ForecastBlock
//     dt={dt}
//     timezone_offset={timezone_offset}
//     temp={temp}
//     feels_like={feels_like}
//     humidity={humidity}
//     weatherDescription={description}
//     weatherIcon={icon}
//   />

//dt,timezone_offset, temp,feels_like,humidity,weather.main/.description/.icon

function ForecastBlock({
  dt,
  temp,
  feels_like,
  humidity,
  description,
  icon,
  onBlockClick,
  id,
}) {
  const monthOffset = 1;
  const month = ("0" + (moment.unix(dt).month() + monthOffset)).slice(-2);
  const date = ("0" + moment.unix(dt).date()).slice(-2);
  const kelvinToCelsius = -273.15;
  temp += kelvinToCelsius;
  feels_like += kelvinToCelsius;
  return (
    <button
      class="transform hover:scale-105 m-4"
      onClick={onBlockClick}
      id={id}
    >
      <div className="flex center">
        <div className="max-w-lg rounded overflow-hidden shadow-lg bg-blue-200 p-4">
          <div className="flex  mr-2">
            <div>
              <img
                className="w-32"
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="Current Weather"
              />
            </div>

            <div className="justify-end m-0">
              <p className="text-3xl">{`${temp.toFixed(1)}°C`}</p>
              <p className="text-sm m-0">Feels Like:</p>
              <p className="text-2xl">{`${feels_like.toFixed(1)}°C`}</p>
              <p className="text-3xl m-0">{`${month}/${date}`}</p>
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
