import Card from "../../components/ui/Card";
import ForecastItem from "./ForecastItem";
import "./Forecast.css";

const data = [
  {
    id: 1,
    date: "30/09",
    day: "WED",
    hiTemp: "21°",
    loTemp: "14°",
    dayWeather: "Cloudy",
    nightWeather: "Rain Cloudy",
    humidity: "10%",
  },
  {
    id: 2,
    date: "1/10",
    day: "THU",
    hiTemp: "22°",
    loTemp: "15°",
    dayWeather: "Clear sky",
    nightWeather: "Storm",
    humidity: "12%",
  },
  {
    id: 3,
    date: "2/10",
    day: "FRI",
    hiTemp: "16°",
    loTemp: "9°",
    dayWeather: "Thunder Storm",
    nightWeather: "Cloudy",
    humidity: "16%",
  },
];

function Forecast() {
  return (
    <Card title="7-DAYS WEATHER FORECAST" className="forecast-weather">
      {data.map((data) => (
        <ForecastItem data={data} key={data.id} />
      ))}
    </Card>
  );
}

export default Forecast;
