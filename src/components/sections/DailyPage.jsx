import DailyItem from "../ui/DailyItem";
import "../../styles/components/sections/DailyPage.css";

const makeDetails = (realFeelShade, wind, humidity, airQuality = "Fair") => [
  { label: "RealFeel Shade", value: `${realFeelShade}°` },
  { label: "Wind", value: wind },
  { label: "Humidity", value: `${humidity}%` },
  { label: "Air Quality", value: airQuality, highlight: airQuality === "Fair" },
];

// Placeholder data - replace with your weather API response later
const days = [
  { id: 1, day: "WED", date: "6/24", condition: "partly-cloudy", summary: "Intermittent clouds", hiTemp: 27, loTemp: 18, precipitation: 6, details: makeDetails(26, "NNW 13 km/h", 42) },
  { id: 2, day: "THU", date: "6/25", condition: "partly-cloudy", summary: "Mostly sunny", hiTemp: 28, loTemp: 17, precipitation: 25, details: makeDetails(26, "NNW 13 km/h", 42) },
  { id: 3, day: "FRI", date: "6/26", condition: "sunny", summary: "Sunny and warm", hiTemp: 30, loTemp: 18, precipitation: 5, details: makeDetails(29, "N 10 km/h", 38) },
  { id: 4, day: "SAT", date: "6/27", condition: "sunny", summary: "Hot with plenty of sun", hiTemp: 32, loTemp: 20, precipitation: 3, details: makeDetails(31, "NE 9 km/h", 35) },
  { id: 5, day: "SUN", date: "6/28", condition: "cloudy", summary: "Clouds increasing", hiTemp: 29, loTemp: 19, precipitation: 20, details: makeDetails(28, "E 12 km/h", 48) },
  { id: 6, day: "MON", date: "6/29", condition: "rain", summary: "Showers in the afternoon", hiTemp: 24, loTemp: 16, precipitation: 70, details: makeDetails(23, "SW 18 km/h", 72, "Good") },
  { id: 7, day: "TUE", date: "6/30", condition: "rain", summary: "Rain and a thunderstorm", hiTemp: 22, loTemp: 15, precipitation: 80, details: makeDetails(21, "SW 20 km/h", 80, "Good") },
  { id: 8, day: "WED", date: "7/1", condition: "cloudy", summary: "Mostly cloudy, cooler", hiTemp: 21, loTemp: 14, precipitation: 30, details: makeDetails(20, "W 15 km/h", 60) },
  { id: 9, day: "THU", date: "7/2", condition: "partly-cloudy", summary: "Partly sunny", hiTemp: 23, loTemp: 14, precipitation: 15, details: makeDetails(22, "W 11 km/h", 52) },
  { id: 10, day: "FRI", date: "7/3", condition: "sunny", summary: "Mostly sunny", hiTemp: 25, loTemp: 15, precipitation: 8, details: makeDetails(24, "NW 9 km/h", 45) },
];

export default function DailyPage() {
  return (
    <main className="daily-page">
      {days.map((day) => (
        <DailyItem key={day.id} data={day} />
      ))}
    </main>
  );
}
