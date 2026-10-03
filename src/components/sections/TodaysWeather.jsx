import { useState } from "react";
import Card from "../ui/Card";

export default function TodaysWeather() {
  const [hiTemp, setHiTemp] = useState("21");
  const [loTemp, setLoTemp] = useState("14");

  return (
    <Card title="TODAY'S WEATHER" date="WED,SEP 30" id="todaysWeather">
      <>
        <p>Sunny to partly cloudy HI: {hiTemp}</p>
        <p>Tonight: Mainly clear Lo: {loTemp}</p>
      </>
    </Card>
  );
}
