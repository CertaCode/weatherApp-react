import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import HourlyWeather from "./HourlyWeather";
import TodaysWeather from "./TodaysWeather";

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
