import PropTypes from "prop-types";
import getWeatherIcon from "./weatherIcons";

export default function CurrentWeatherTemperature({
  temperature,
  realFeel,
  condition,
}) {
  return (
    <div className="current-weather__temperature">
      <div className="current-weather__temperature-info">
        <img
          src={getWeatherIcon(condition.icon)}
          alt={condition.text}
          className="current-weather__icon"
        />
        <div className="current-weather__temperature-info-group">
          <p className="current-weather__temperature-info-p">{temperature}C</p>
          <p>RealFeel {realFeel}C</p>
        </div>
      </div>
      <div className="current-weather__details">
        <p>{condition.text}</p>
        <a href="">{"MORE DETAILS >"}</a>
      </div>
    </div>
  );
}

CurrentWeatherTemperature.propTypes = {
  temperature: PropTypes.number.isRequired,
  realFeel: PropTypes.number.isRequired,
  condition: PropTypes.shape({
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
};
