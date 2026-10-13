import CurrentWeather from "../features/weather/CurrentWeather";
import Forecast from "../features/weather/Forecast";
import HourlyWeather from "../features/weather/HourlyWeather";
import TodaysWeather from "../features/weather/TodaysWeather";
import "./WeatherDashboard.css";

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
