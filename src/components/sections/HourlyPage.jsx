import HourlyItem from "../ui/HourlyItem";
import "../../styles/components/sections/HourlyPage.css";

// Placeholder data - replace with your weather API response later
const hours = [
  {
    id: 1,
    time: "7 PM",
    condition: "partly-cloudy",
    temperature: 27,
    realFeel: 27,
    precipitation: 1,
    details: [
      { label: "RealFeel Shade", value: "26°" },
      { label: "Wind", value: "NNW 13 km/h" },
      { label: "Humidity", value: "42%" },
      { label: "Air Quality", value: "Fair", highlight: true },
    ],
  },
  {
    id: 2,
    time: "8 PM",
    condition: "partly-cloudy",
    temperature: 26,
    realFeel: 25,
    precipitation: 0,
    details: [
      { label: "RealFeel Shade", value: "25°" },
      { label: "Wind", value: "NNW 13 km/h" },
      { label: "Humidity", value: "52%" },
      { label: "Air Quality", value: "Fair", highlight: true },
      { label: "Indoor Humidity", value: "52% (Slightly Humid)" },
      { label: "Wind Gusts", value: "19 km/h" },
      { label: "Dew Point", value: "14°C" },
      { label: "Visibility", value: "16km" },
      { label: "Cloud Ceiling", value: "9100 m" },
      { label: "Cloud Cover", value: "45%" },
    ],
  },
  {
    id: 3,
    time: "9 PM",
    condition: "cloudy-night",
    temperature: 24,
    realFeel: 23,
    precipitation: 2,
    details: [
      { label: "RealFeel Shade", value: "23°" },
      { label: "Wind", value: "N 11 km/h" },
      { label: "Humidity", value: "58%" },
      { label: "Air Quality", value: "Fair", highlight: true },
    ],
  },
];

export default function HourlyPage() {
  return (
    <main className="hourly-page">
      {hours.map((hour, index) => (
        <HourlyItem key={hour.id} data={hour} defaultOpen={index < 2} />
      ))}
    </main>
  );
}
