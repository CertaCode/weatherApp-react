import PropTypes from "prop-types";
import sunnyIcon from "../../assets/weather-icons/sun.svg";
import rainIcon from "../../assets/weather-icons/rain.svg";
import cloudyIcon from "../../assets/weather-icons/cloudy.svg";
import partlyCloudyIcon from "../../assets/weather-icons/partly-cloudy.svg";
import humidityIcon from "../../assets/humidity.svg";
import "./DailyItem.css";

const icons = {
  sunny: sunnyIcon,
  rain: rainIcon,
  cloudy: cloudyIcon,
  "partly-cloudy": partlyCloudyIcon,
};

function DailyItem({ data }) {
  return (
    <article className="card daily-item">
      <div className="daily-item__top">
        <div className="daily-item__main">
          <div className="daily-item__date">
            <p className="daily-item__day">{data.day}</p>
            <p className="daily-item__date-p">{data.date}</p>
          </div>
          <img
            src={icons[data.condition] ?? sunnyIcon}
            alt=""
            className="daily-item__icon"
          />
          <div className="daily-item__temps">
            <p className="daily-item__hi">{data.hiTemp}°</p>
            <p className="daily-item__lo">/{data.loTemp}°</p>
          </div>
        </div>

        <div className="daily-item__precipitation">
          <img src={humidityIcon} alt="Precipitation" />
          <p>{data.precipitation}%</p>
        </div>
      </div>

      <p className="daily-item__summary">{data.summary}</p>

      <dl className="daily-item__details">
        {data.details.map((detail) => (
          <div className="daily-item__detail" key={detail.label}>
            <dt>{detail.label}</dt>
            <dd
              className={detail.highlight ? "daily-item__value--good" : undefined}>
              {detail.value}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

DailyItem.propTypes = {
  data: PropTypes.shape({
    day: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    hiTemp: PropTypes.number.isRequired,
    loTemp: PropTypes.number.isRequired,
    precipitation: PropTypes.number.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        highlight: PropTypes.bool,
      }),
    ).isRequired,
  }).isRequired,
};

export default DailyItem;
