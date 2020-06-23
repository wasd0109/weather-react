import React from "react";
import "./DetailedPage.css";
import moment from "moment";

function DetailedPage({ route, dailyForecast, onPopupClick }) {
  if (route === "home") {
    return <div className="hidden">Not in use</div>;
  } else {
    const kelvinToCelsius = -273.15;
    const monthOffset = 1;
    const { dt, sunrise, sunset, temp, weather } = dailyForecast[route];
    const objectMap = (obj, fn) =>
      Object.fromEntries(
        Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)])
      );
    const tempCelsius = objectMap(temp, (t) =>
      (t + kelvinToCelsius).toFixed(1)
    );
    const { morn, day, eve, night, min, max } = tempCelsius;
    const { icon } = weather[0];
    const month = ("0" + (moment.unix(dt).month() + monthOffset)).slice(-2);
    const date = ("0" + moment.unix(dt).date()).slice(-2);
    const sunriseTime = `${("0" + moment.unix(sunrise).hour()).slice(-2)}:${(
      "0" + moment.unix(sunrise).minute()
    ).slice(-2)}`;
    const sunsetTime = `${("0" + moment.unix(sunset).hour()).slice(-2)}:${(
      "0" + moment.unix(sunset).minute()
    ).slice(-2)}`;
    return (
      <div>
        <div
          id="outsidePop"
          className="bg-black bg-opacity-50 fixed cursor-pointer"
          onClick={onPopupClick}
        >
          Hello
        </div>
        <div
          id="popup"
          className="z-10 fixed bg-blue-300 mx-auto p-3 shadow-lg rounded max-w-xl  overflow-hidden  bg-blue-300"
        >
          <div className="flex justify-center">
            <div>
              <img
                className="mr-8"
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="Current Weather"
              />
            </div>
            <div className="justify-end m-4">
              <p className="text-sm">Max</p>
              <p className="text-3xl">{max}°C</p>
              <p className="text-sm">Min</p>
              <p className="text-3xl">{min}°C</p>
              <p className=" text-3xl">{`${month}/${date}`}</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="mx-4">
              <p>Sunrise at:</p>
              <p className="text-2xl">{sunriseTime}</p>
            </div>
            <div className="mx-4">
              <p>Sunset at:</p>
              <p className="text-2xl">{sunsetTime}</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="m-2">
              <p>Morning</p>
              <p className="text-xl">{morn}°C</p>
            </div>
            <div className="m-2">
              <p>Afternoon</p>
              <p className="text-xl">{day}°C</p>
            </div>
            <div className="m-2">
              <p>Evening</p>
              <p className="text-xl">{eve}°C</p>
            </div>
            <div className="m-2">
              <p>Night</p>
              <p className="text-xl">{night}°C</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailedPage;
