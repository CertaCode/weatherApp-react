import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import HourlyWeather from "./HourlyWeather";
import TodaysWeather from "./TodaysWeather";
import "../../styles/components/sections/WeatherDashboard.css";

export default function WeatherDashboard() {
  return (
    <main>
      <TodaysWeather />
      <CurrentWeather />
      <HourlyWeather />
      <Forecast />
    </main>
  );
}
