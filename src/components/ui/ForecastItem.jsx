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
        <div className="forecast__date">
          <p>{data.date}</p>
          <p>{data.day}</p>
        </div>
        <div className="forecast__temperature">
          <img src={weatherIcon} />
          <p>{data.hiTemp}</p>
          <p>{data.loTemp}</p>
        </div>
      </div>
      <div className="forecast__right-group">
        <div className="forecast__details">
          <p>{data.dayWeather}</p>
          <p>{data.nightWeather}</p>
        </div>
        <div className="forecast__humidity">
          <img src={humidityIcon} />
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
