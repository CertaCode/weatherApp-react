import { useState } from "react";
import Card from "../../components/ui/Card";
import "./TodaysWeather.css";

async function getWeather() {
  const result = await fetch("http://localhost:3000/api/today-weather");
  console.log(result);
}

export default function TodaysWeather() {
  const [hiTemp, setHiTemp] = useState("21");
  const [loTemp, setLoTemp] = useState("14");
  getWeather();

  return (
    <Card title="TODAY'S WEATHER" date="WED,SEP 30" className="todays-weather">
      <>
        <p>Sunny to partly cloudy HI: {hiTemp}</p>
        <p>Tonight: Mainly clear Lo: {loTemp}</p>
      </>
    </Card>
  );
}
