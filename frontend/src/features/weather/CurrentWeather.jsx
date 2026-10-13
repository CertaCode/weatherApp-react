import { Fragment } from "react";
import Card from "../../components/ui/Card";
import CurrentWeatherTemperature from "./CurrentWeatherTemperature";
import CurrentWeatherInformation from "./CurrentWeatherInformation";
import "./CurrentWeather.css";

export default function CurrentWeather() {
  const currentTime = new Date().toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card
      title="CURRENT WEATHER"
      date={currentTime}
      className="current-weather">
      <Fragment>
        <CurrentWeatherTemperature />
        <CurrentWeatherInformation />
      </Fragment>
    </Card>
  );
}
