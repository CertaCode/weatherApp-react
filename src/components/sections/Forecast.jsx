import Card from "../ui/Card";
import ForecastItem from "../ui/ForecastItem";

const data = [
  {
    id: 1,
    date: "30/09",
    day: "WED",
    hiTemp: "21C",
    loTemp: "14C",
    dayWeather: "Cloudy",
    nightWeather: "Rain Cloudy",
    humidity: "10%",
  },
  {
    id: 2,
    date: "1/10",
    day: "THU",
    hiTemp: "22C",
    loTemp: "15C",
    dayWeather: "Clear sky",
    nightWeather: "Storm",
    humidity: "12%",
  },
  {
    id: 3,
    date: "2/10",
    day: "FRI",
    hiTemp: "16C",
    loTemp: "9C",
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
