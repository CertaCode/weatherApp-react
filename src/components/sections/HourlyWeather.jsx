import Card from "../ui/Card";
import Carousel from "../ui/Carousel";
import "../../styles/components/sections/HourlyWeather.css";

const items = [
  {
    id: 1,
    time: "12:00",
    temperature: "16C",
    humidity: "8",
  },
  {
    id: 2,
    time: "13:00",
    temperature: "18C",
    humidity: "8",
  },
  {
    id: 3,
    time: "14:00",
    temperature: "19C",
    humidity: "8",
  },
  {
    id: 4,
    time: "14:00",
    temperature: "19C",
    humidity: "8",
  },
  {
    id: 5,
    time: "14:00",
    temperature: "19C",
    humidity: "8",
  },
  {
    id: 6,
    time: "14:00",
    temperature: "19C",
    humidity: "8",
  },
  {
    id: 7,
    time: "14:00",
    temperature: "19C",
    humidity: "8",
  },
];

export default function HourlyWeather() {
  // npm install uuid (might be useful for later)
  return (
    <Card title="HOURLY WEATHER" className="hourly-weather">
      <Carousel>
        {items.map((item, index) => (
          <Carousel.Item
            time={item.time}
            temperature={item.temperature}
            humidity={item.humidity}
            key={item.id}
          />
        ))}
      </Carousel>
    </Card>
  );
}
