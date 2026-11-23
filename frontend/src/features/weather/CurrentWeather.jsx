import { Fragment } from "react";
import PropTypes from "prop-types";
import Card from "../../components/ui/Card";
import CurrentWeatherTemperature from "./CurrentWeatherTemperature";
import CurrentWeatherInformation from "./CurrentWeatherInformation";
import "./CurrentWeather.css";

export default function CurrentWeather({ current, localTime }) {
  return (
    <Card title="CURRENT WEATHER" date={localTime} className="current-weather">
      <Fragment>
        <CurrentWeatherTemperature
          temperature={current.temperature}
          realFeel={current.realFeel}
          condition={current.condition}
        />
        <CurrentWeatherInformation
          wind={current.wind}
          windGust={current.windGust}
          airQuality={current.airQuality}
        />
      </Fragment>
    </Card>
  );
}

CurrentWeather.propTypes = {
  current: PropTypes.shape({
    temperature: PropTypes.number.isRequired,
    realFeel: PropTypes.number.isRequired,
    condition: PropTypes.shape({
      text: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }).isRequired,
    wind: PropTypes.string.isRequired,
    windGust: PropTypes.string.isRequired,
    airQuality: PropTypes.object,
  }).isRequired,
  localTime: PropTypes.string.isRequired,
};
