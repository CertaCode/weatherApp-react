import { Fragment } from "react";
import Card from "../ui/Card";
import CurrentWeatherTemperature from "../ui/CurrentWeatherTemperature";
import CurrentWeatherInformation from "../ui/CurrentWeatherInformation";
import "../../styles/components/sections/CurrentWeather.css";

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
