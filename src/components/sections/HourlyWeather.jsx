import Card from "../ui/Card";
import Carousel from "../ui/Carousel";

const items = [
  {
    time: "12:00",
    temperature: "16C",
    humidity: "8",
  },
  {
    time: "13:00",
    temperature: "18C",
    humidity: "8",
  },
  {
    time: "14:00",
    temperature: "19C",
    humidity: "8",
  },
];

export default function HourlyWeather() {
  // npm install uuid (might be useful for later)
  return (
    <Card title="HOURLY WEATHER" id="hourlyWeather">
      <Carousel>
        {items.map((item, index) => (
          <Carousel.Item
            time={item.time}
            temperature={item.temperature}
            humidity={item.humidity}
            key={index}
          />
        ))}
      </Carousel>
    </Card>
  );
}
