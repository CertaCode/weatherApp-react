import PropTypes from "prop-types";

export default function CurrentWeatherInformation({
  wind,
  windGust,
  airQuality,
}) {
  return (
    <div className="current-weather__information">
      <div className="current-weather__information-list">
        <ul>
          <li>
            <p>Wind</p>
            <p>{wind}</p>
          </li>
          <li>
            <p>Wind Gust</p>
            <p>{windGust}</p>
          </li>
          <li>
            <p>Air Quality</p>
            <p
              className={airQuality ? `aq--${airQuality.severity}` : undefined}>
              {airQuality.label ?? "N/A"}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

CurrentWeatherInformation.propTypes = {
  wind: PropTypes.string.isRequired,
  windGust: PropTypes.string.isRequired,
  airQuality: PropTypes.shape({
    label: PropTypes.string.isRequired,
    severity: PropTypes.string.isRequired,
  }),
};
