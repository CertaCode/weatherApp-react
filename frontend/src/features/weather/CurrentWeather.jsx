import { Fragment } from "react";
import Card from "../../components/ui/Card";
import CurrentWeatherTemperature from "./CurrentWeatherTemperature";
import CurrentWeatherInformation from "./CurrentWeatherInformation";
import useWeather from "../../hooks/useWeather";
import "./CurrentWeather.css";

export default function CurrentWeather() {
  const { data, error, loading } = useWeather("Hamburg");

  if (loading && !data) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!data) return null;

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
        <CurrentWeatherTemperature
          temperature={data.temperature}
          realFeel={data.realFeel}
          condition={data.condition}
        />
        <CurrentWeatherInformation
          wind={data.wind}
          windGust={data.windGust}
          airQuality={data.airQuality}
        />
      </Fragment>
    </Card>
  );
}
