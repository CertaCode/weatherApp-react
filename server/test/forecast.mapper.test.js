import { describe, it, expect } from "vitest";
import fixture from "./fixtures/forecast.json";
import { mapForecast } from "../src/services/forecast.mapper.js";

// The fixture is a real Hamburg response (3 forecast days, 2026-11-23 .. 2026-11-25).
// "now" comes from location.localtime, so tests pin the time by editing a copy.
function at(localtime, edit) {
  const data = structuredClone(fixture);
  data.location.localtime = localtime;
  edit?.(data);
  return data;
}

const allHours = (data) => data.forecast.forecastday.flatMap((d) => d.hour);

function setCondition(data, predicate, code, text) {
  for (const h of allHours(data)) {
    if (predicate(h.time)) h.condition = { text, code, icon: "" };
  }
}

describe("mapForecast: location and current", () => {
  const result = mapForecast(at("2026-11-23 03:53"));

  it("returns the city, country and city-local time", () => {
    expect(result.location).toEqual({
      city: "Hamburg",
      country: "Germany",
      localTime: "03:53",
    });
  });

  it("maps current conditions to the app's shape", () => {
    const c = fixture.current;
    expect(result.current).toMatchObject({
      temperature: Math.round(c.temp_c),
      realFeel: Math.round(c.feelslike_c),
      humidity: c.humidity,
      wind: `${c.wind_dir} ${Math.round(c.wind_kph)} km/h`,
      windGust: `${c.gust_kph} km/h`,
    });
    expect(result.current.condition.text).toBe(c.condition.text);
    expect(["sunny", "night", "partly-cloudy", "cloudy-night", "cloudy", "rain"]).toContain(
      result.current.condition.icon,
    );
  });

  it("uses the night icon for clear night-time current conditions", () => {
    const data = at("2026-11-23 03:53", (d) => {
      d.current.is_day = 0;
      d.current.condition = { text: "Clear", code: 1000, icon: "" };
    });
    expect(mapForecast(data).current.condition).toEqual({ text: "Clear", icon: "night" });
  });
});

describe("mapForecast: today", () => {
  const result = mapForecast(at("2026-11-23 14:05"));
  const day = fixture.forecast.forecastday[0].day;

  it("labels the date in city-local terms", () => {
    expect(result.today.dateLabel).toBe("MON, NOV 23");
  });

  it("uses the calendar-day max as today's hi", () => {
    expect(result.today.hi).toBe(Math.round(day.maxtemp_c));
  });

  it("uses the day condition with a day icon", () => {
    expect(result.today.condition.text).toBe(day.condition.text);
    expect(result.today.condition.icon).toBe("sunny");
  });
});

describe("mapForecast: tonight", () => {
  const minTemp = (data, from, to) =>
    Math.round(
      Math.min(
        ...allHours(data)
          .filter((h) => h.time >= from && h.time <= to)
          .map((h) => h.temp_c),
      ),
    );

  it("spans 18:00 to 06:00 next morning when asked during the day", () => {
    const data = at("2026-11-23 14:05");
    expect(mapForecast(data).today.tonight.lo).toBe(
      minTemp(data, "2026-11-23 18:00", "2026-11-24 06:00"),
    );
  });

  it("starts at the current hour when it is already after 18:00", () => {
    const data = at("2026-11-23 20:30");
    expect(mapForecast(data).today.tonight.lo).toBe(
      minTemp(data, "2026-11-23 20:00", "2026-11-24 06:00"),
    );
  });

  it("is the rest of the night when asked before 06:00", () => {
    const data = at("2026-11-23 03:53");
    expect(mapForecast(data).today.tonight.lo).toBe(
      minTemp(data, "2026-11-23 03:00", "2026-11-23 06:00"),
    );
  });

  it("uses the most frequent condition in the window", () => {
    const data = at("2026-11-23 14:05", (d) => {
      setCondition(d, () => true, 1000, "Clear");
      // 9 rainy hours (18:00-02:00) beat 4 clear ones (03:00-06:00)
      setCondition(
        d,
        (t) => t >= "2026-11-23 18:00" && t <= "2026-11-24 02:00",
        1183,
        "Light rain",
      );
    });
    expect(mapForecast(data).today.tonight.condition).toEqual({
      text: "Light rain",
      icon: "rain",
    });
  });

  it("is null when the forecast has no hours for the window", () => {
    const data = at("2026-11-25 22:30");
    expect(mapForecast(data).today.tonight).not.toBeNull(); // last day, only 22:00-23:00 left
    const short = at("2026-11-23 22:30", (d) => {
      d.forecast.forecastday = d.forecast.forecastday.slice(0, 1);
      d.forecast.forecastday[0].hour = d.forecast.forecastday[0].hour.filter((h) => h.time < "2026-11-23 22:00");
    });
    expect(mapForecast(short).today.tonight).toBeNull();
  });
});

describe("mapForecast: hours", () => {
  it("returns 24 entries starting at the current city-local hour", () => {
    const { hours } = mapForecast(at("2026-11-23 03:53"));
    expect(hours).toHaveLength(24);
    expect(hours[0].time).toBe("03:00");
    expect(hours[23].time).toBe("02:00");
  });

  it("crosses midnight", () => {
    const { hours } = mapForecast(at("2026-11-23 22:30"));
    expect(hours.slice(0, 4).map((h) => h.time)).toEqual(["22:00", "23:00", "00:00", "01:00"]);
  });

  it("maps each hour to numbers and a condition", () => {
    const { hours } = mapForecast(at("2026-11-23 03:53"));
    const raw = fixture.forecast.forecastday[0].hour[3];
    expect(hours[0]).toEqual({
      time: "03:00",
      condition: { text: raw.condition.text, icon: "night" },
      temperature: Math.round(raw.temp_c),
      humidity: raw.humidity,
    });
  });

  it("returns fewer entries when the forecast runs out", () => {
    const { hours } = mapForecast(at("2026-11-25 22:30"));
    expect(hours.map((h) => h.time)).toEqual(["22:00", "23:00"]);
  });
});

describe("mapForecast: days", () => {
  const { days } = mapForecast(at("2026-11-23 14:05"));

  it("returns one entry per provider day, starting with today", () => {
    expect(days).toHaveLength(fixture.forecast.forecastday.length);
    expect(days[0]).toMatchObject({ day: "MON", date: "23/11" });
    expect(days[1]).toMatchObject({ day: "TUE", date: "24/11" });
  });

  it("maps hi, lo and humidity to numbers", () => {
    const raw = fixture.forecast.forecastday[1].day;
    expect(days[1]).toMatchObject({
      hi: Math.round(raw.maxtemp_c),
      lo: Math.round(raw.mintemp_c),
      humidity: raw.avghumidity,
    });
  });

  it("uses a day icon for the day condition and the evening mode for the night condition", () => {
    const data = at("2026-11-23 14:05", (d) => {
      setCondition(d, () => true, 1000, "Clear");
      setCondition(d, (t) => t.startsWith("2026-11-24") && t.slice(11, 13) >= "18", 1183, "Light rain");
    });
    const mapped = mapForecast(data).days;
    expect(mapped[1].nightCondition).toEqual({ text: "Light rain", icon: "rain" });
    expect(mapped[0].nightCondition.icon).toBe("night");
    expect(["sunny", "partly-cloudy", "cloudy", "rain"]).toContain(mapped[0].dayCondition.icon);
  });
});
