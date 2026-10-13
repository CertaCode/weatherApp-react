import PropTypes from "prop-types";
import sunnyIcon from "../../assets/weather-icons/sun.svg";
import rainIcon from "../../assets/weather-icons/rain.svg";
import cloudyIcon from "../../assets/weather-icons/cloudy.svg";
import partlyCloudyIcon from "../../assets/weather-icons/partly-cloudy.svg";
import nightyIcon from "../../assets/weather-icons/night.svg";
import cloudyNightIcon from "../../assets/weather-icons/cloudy-night.svg";
import humidityIcon from "../../assets/humidity.svg";

function ForecastItem({ data }) {
  const weather = data.dayWeather.toLowerCase();
  const weatherIcon =
    weather === "sunny" ? sunnyIcon
    : weather === "rain" ? rainIcon
    : weather === "cloudy" ? cloudyIcon
    : weather === "partly cloudy" ? partlyCloudyIcon
    : weather === "night" ? nightyIcon
    : weather === "cloudy night" ? cloudyNightIcon
    : sunnyIcon;

  return (
    <div className="forecast__item">
      <div className="forecast__left-group">
        <div className="forecast__date-group">
          <p className="forecast__day">{data.day}</p>
          <p>{data.date}</p>
        </div>
        <div className="forecast__temperature">
          <div className="forecast__icon">
            <img src={weatherIcon} />
          </div>
          <div className="forecast__degrees">
            <p className="forecast__hi">{data.hiTemp}</p>
            <p className="forecast__lo">{data.loTemp}</p>
          </div>
        </div>
      </div>
      <div className="forecast__right-group">
        <div className="forecast__details">
          <p>{data.dayWeather}</p>
          <div className="forecast__night">
            <img src={cloudyNightIcon} alt="night clouds" />
            <p>{data.nightWeather}</p>
          </div>
        </div>
        <div className="forecast__humidity">
          <div className="forecast__humidity-icon">
            <img src={humidityIcon} />
          </div>
          <p>{data.humidity}</p>
        </div>
      </div>
    </div>
  );
}

ForecastItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ForecastItem;
