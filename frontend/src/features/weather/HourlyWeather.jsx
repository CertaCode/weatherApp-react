import PropTypes from "prop-types";
import Card from "../../components/ui/Card";
import Carousel from "../../components/ui/Carousel";
import getWeatherIcon from "./weatherIcons";
import "./HourlyWeather.css";

export default function HourlyWeather({ hours }) {
  return (
    <Card title="HOURLY WEATHER" className="hourly-weather">
      <Carousel>
        {hours.map((hour) => (
          <Carousel.Item
            key={hour.time}
            time={hour.time}
            icon={getWeatherIcon(hour.condition.icon)}
            iconLabel={hour.condition.text}
            temperature={hour.temperature}
            humidity={hour.humidity}
          />
        ))}
      </Carousel>
    </Card>
  );
}

HourlyWeather.propTypes = {
  hours: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      condition: PropTypes.shape({
        text: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      }).isRequired,
      temperature: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
