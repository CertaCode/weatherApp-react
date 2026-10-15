import weatherIcon from "../../assets/weather-icons/sun.svg";

export default function CurrentWeatherTemperature({
  temperature,
  realFeel,
  condition,
}) {
  return (
    <div className="current-weather__temperature">
      <div className="current-weather__temperature-info">
        <img src={weatherIcon} className="current-weather__icon" />
        <div className="current-weather__temperature-info-group">
          <p className="current-weather__temperature-info-p">{temperature}C</p>
          <p>RealFeel {realFeel}C</p>
        </div>
      </div>
      <div className="current-weather__details">
        <p>{condition}</p>
        <a href="">{"MORE DETAILS >"}</a>
      </div>
    </div>
  );
}
