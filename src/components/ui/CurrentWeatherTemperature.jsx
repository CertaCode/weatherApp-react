import weatherIcon from "../../assets/weather-icons/sun.svg";

export default function CurrentWeatherTemperature() {
  return (
    <div className="currentWeather-temperature">
      <div className="temperature">
        <img src={weatherIcon} />
        <div className="temperatureInfo">
          <p className="currentTemperature">19C</p>
          <p>RealFeel 18C</p>
        </div>
      </div>
      <div className="weatherDetails">
        <p>Clear</p>
        <a href="">{"MORE DETAILS >"}</a>
      </div>
    </div>
  );
}
