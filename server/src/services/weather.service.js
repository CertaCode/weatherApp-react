import axios from "axios";
import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";

export async function getCurrentWeather(city) {
  let data;

  try {
    const response = await axios.get(`${env.WEATHER_API_URL}`, {
      params: { key: env.WEATHER_API_KEY, q: city, days: 1, aqi: "yes" },
      timeout: 8000,
    });
    data = response.data;
  } catch (err) {
    console.error("Weather provider error:", err.message);  // full detail stays on the server

    if (axios.isAxiosError(err) && err.response?.status === 400) {
      throw new AppError(404, `City '${city}' not found`);
    }
    throw new AppError(502, "Weather provider is unavailable");
  }

  // Map the provider's shape to the shape YOUR frontend uses
  return {
    city: data.location.name,
    country: data.location.country,
    condition: data.current.condition.text,
    temperature: Math.round(data.current.temp_c),
    realFeel: Math.round(data.current.feelslike_c),
    humidity: data.current.humidity,
    wind: `${data.current.wind_dir} ${Math.round(data.current.wind_kph)} km/h`,
  };
}