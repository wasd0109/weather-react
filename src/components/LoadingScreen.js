import React from "react";
import ReactLoading from "react-loading";
import "./LoadingScreen.css";

const LoadingScreen = ({ type, color }) => (
  <ReactLoading
    className="absolute"
    id="loading"
    type={type}
    color={color}
    height={100}
    width={100}
  />
);

export default LoadingScreen;
