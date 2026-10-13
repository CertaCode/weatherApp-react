import { useState, useId } from "react";
import PropTypes from "prop-types";
import sunnyIcon from "../../assets/weather-icons/sun.svg";
import rainIcon from "../../assets/weather-icons/rain.svg";
import cloudyIcon from "../../assets/weather-icons/cloudy.svg";
import partlyCloudyIcon from "../../assets/weather-icons/partly-cloudy.svg";
import nightIcon from "../../assets/weather-icons/night.svg";
import cloudyNightIcon from "../../assets/weather-icons/cloudy-night.svg";
import humidityIcon from "../../assets/humidity.svg";
import "./HourlyItem.css";

const icons = {
  sunny: sunnyIcon,
  rain: rainIcon,
  cloudy: cloudyIcon,
  "partly-cloudy": partlyCloudyIcon,
  night: nightIcon,
  "cloudy-night": cloudyNightIcon,
};

function HourlyItem({ data, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const detailsId = useId();

  return (
    <article className="card hourly-item">
      <button
        type="button"
        className="hourly-item__summary"
        aria-expanded={isOpen}
        aria-controls={detailsId}
        onClick={() => setIsOpen((open) => !open)}>
        <div className="hourly-item__main">
          <p className="hourly-item__time">{data.time}</p>
          <img
            src={icons[data.condition] ?? sunnyIcon}
            alt={data.condition.replace("-", " ")}
            className="hourly-item__icon"
          />
          <p className="hourly-item__temp">{data.temperature}°</p>
        </div>

        <p className="hourly-item__realfeel">RealFeel {data.realFeel}°</p>

        <div className="hourly-item__meta">
          <div className="hourly-item__precipitation">
            <img src={humidityIcon} alt="Precipitation" />
            <p>{data.precipitation}%</p>
          </div>
          <svg
            className={`hourly-item__chevron ${
              isOpen ? "hourly-item__chevron--open" : ""
            }`}
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <dl id={detailsId} className="hourly-item__details">
          {data.details.map((detail) => (
            <div className="hourly-item__detail" key={detail.label}>
              <dt>{detail.label}</dt>
              <dd
                className={
                  detail.highlight ? "hourly-item__value--good" : undefined
                }>
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}

HourlyItem.propTypes = {
  data: PropTypes.shape({
    time: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    realFeel: PropTypes.number.isRequired,
    precipitation: PropTypes.number.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        highlight: PropTypes.bool,
      }),
    ).isRequired,
  }).isRequired,
  defaultOpen: PropTypes.bool,
};

export default HourlyItem;
