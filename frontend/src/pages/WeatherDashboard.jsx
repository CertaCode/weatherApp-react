import CurrentWeather from "../features/weather/CurrentWeather";
import Forecast from "../features/weather/Forecast";
import HourlyWeather from "../features/weather/HourlyWeather";
import TodaysWeather from "../features/weather/TodaysWeather";
import useForecast from "../hooks/useForecast";
import "./WeatherDashboard.css";

const CITY = "Hamburg";

export default function WeatherDashboard() {
  const { data, error, loading } = useForecast(CITY);

  if (loading) return <main><p>Loading...</p></main>;
  if (error) return <main><p role="alert">{error}</p></main>;

  return (
    <main>
      <TodaysWeather today={data.today} />
      <CurrentWeather
        current={data.current}
        localTime={data.location.localTime}
      />
      <HourlyWeather hours={data.hours} />
      <Forecast />
    </main>
  );
}
