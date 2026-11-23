import PropTypes from "prop-types";
import getWeatherIcon from "./weatherIcons";
import humidityIcon from "../../assets/humidity.svg";

function ForecastItem({ data }) {
  return (
    <div className="forecast__item">
      <div className="forecast__left-group">
        <div className="forecast__date-group">
          <p className="forecast__day">{data.day}</p>
          <p>{data.date}</p>
        </div>
        <div className="forecast__temperature">
          <div className="forecast__icon">
            <img
              src={getWeatherIcon(data.dayCondition.icon)}
              alt={data.dayCondition.text}
            />
          </div>
          <div className="forecast__degrees">
            <p className="forecast__hi">{data.hi}°</p>
            <p className="forecast__lo">{data.lo}°</p>
          </div>
        </div>
      </div>
      <div className="forecast__right-group">
        <div className="forecast__details">
          <p>{data.dayCondition.text}</p>
          <div className="forecast__night">
            <img
              src={getWeatherIcon(data.nightCondition.icon)}
              alt={data.nightCondition.text}
            />
            <p>{data.nightCondition.text}</p>
          </div>
        </div>
        <div className="forecast__humidity">
          <div className="forecast__humidity-icon">
            <img src={humidityIcon} alt="Humidity" />
          </div>
          <p>{data.humidity}%</p>
        </div>
      </div>
    </div>
  );
}

const conditionShape = PropTypes.shape({
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
});

ForecastItem.propTypes = {
  data: PropTypes.shape({
    day: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    hi: PropTypes.number.isRequired,
    lo: PropTypes.number.isRequired,
    dayCondition: conditionShape.isRequired,
    nightCondition: conditionShape.isRequired,
    humidity: PropTypes.number.isRequired,
  }).isRequired,
};

export default ForecastItem;
