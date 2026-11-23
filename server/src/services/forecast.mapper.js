import { getAirQuality } from "../utils/airQuality.js";
import { getConditionIcon } from "../utils/conditionIcon.js";

// All provider timestamps are city-local strings ("2026-11-23 14:05"). They are
// parsed and compared as strings, never through the browser's or server's timezone.

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const HOURLY_WINDOW = 24;
const NIGHT_START_HOUR = 18;
const NIGHT_END = "06:00";
const pad = (n) => String(n).padStart(2, "0");

function parseDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return { year, month, day, weekday };
}

function nextDate(dateStr) {
  const { year, month, day } = parseDate(dateStr);
  return new Date(Date.UTC(year, month - 1, day + 1)).toISOString().slice(0, 10);
}

const dayLabel = (dateStr) => WEEKDAYS[parseDate(dateStr).weekday];
const shortDate = (dateStr) => {
  const { month, day } = parseDate(dateStr);
  return `${pad(day)}/${pad(month)}`;
};
const longDate = (dateStr) => {
  const { month, day } = parseDate(dateStr);
  return `${dayLabel(dateStr)}, ${MONTHS[month - 1]} ${day}`;
};

function toCondition(condition, isDay) {
  return { text: condition.text, icon: getConditionIcon(condition.code, isDay) };
}

// The condition that occurs in most of the given hours (earliest wins a tie).
function dominantCondition(hours) {
  if (hours.length === 0) return null;
  const counts = new Map();
  for (const h of hours) counts.set(h.condition.code, (counts.get(h.condition.code) ?? 0) + 1);
  const topCode = [...counts.entries()].reduce((best, entry) => (entry[1] > best[1] ? entry : best))[0];
  const hour = hours.find((h) => h.condition.code === topCode);
  return toCondition(hour.condition, hour.is_day);
}

function mapTonight(hours, localtime) {
  const [date, time] = localtime.split(" ");
  const nowHour = Number(time.slice(0, 2));

  // Before 06:00 it is still last night: the rest of it runs until 06:00 today.
  const start = nowHour < 6 ? `${date} ${pad(nowHour)}:00` : `${date} ${pad(Math.max(nowHour, NIGHT_START_HOUR))}:00`;
  const end = `${nowHour < 6 ? date : nextDate(date)} ${NIGHT_END}`;

  const window = hours.filter((h) => h.time >= start && h.time <= end);
  if (window.length === 0) return null;

  return {
    condition: dominantCondition(window),
    lo: Math.round(Math.min(...window.map((h) => h.temp_c))),
  };
}

/**
 * Map WeatherAPI's forecast response to the app's own shape.
 * "Now" is the city's own clock (location.localtime), so this is a pure function.
 */
export function mapForecast(data) {
  const { location, current } = data;
  const forecastDays = data.forecast.forecastday;
  const allHours = forecastDays.flatMap((d) => d.hour);
  const [nowDate, nowTime] = location.localtime.split(" ");
  const currentHourStart = `${nowDate} ${nowTime.slice(0, 2)}:00`;
  const today = forecastDays[0];

  return {
    location: {
      city: location.name,
      country: location.country,
      localTime: nowTime,
    },
    current: {
      condition: toCondition(current.condition, current.is_day),
      temperature: Math.round(current.temp_c),
      realFeel: Math.round(current.feelslike_c),
      humidity: current.humidity,
      wind: `${current.wind_dir} ${Math.round(current.wind_kph)} km/h`,
      windGust: `${current.gust_kph} km/h`,
      airQuality: getAirQuality(current.air_quality?.["us-epa-index"]),
    },
    today: {
      dateLabel: longDate(today.date),
      condition: toCondition(today.day.condition, 1),
      hi: Math.round(today.day.maxtemp_c),
      tonight: mapTonight(allHours, location.localtime),
    },
    hours: allHours
      .filter((h) => h.time >= currentHourStart)
      .slice(0, HOURLY_WINDOW)
      .map((h) => ({
        time: h.time.slice(11, 16),
        condition: toCondition(h.condition, h.is_day),
        temperature: Math.round(h.temp_c),
        humidity: h.humidity,
      })),
    days: forecastDays.map((d) => ({
      day: dayLabel(d.date),
      date: shortDate(d.date),
      hi: Math.round(d.day.maxtemp_c),
      lo: Math.round(d.day.mintemp_c),
      dayCondition: toCondition(d.day.condition, 1),
      nightCondition: dominantCondition(d.hour.filter((h) => Number(h.time.slice(11, 13)) >= NIGHT_START_HOUR)),
      humidity: d.day.avghumidity,
    })),
  };
}
