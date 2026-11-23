import axios from "axios";
import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import { mapForecast } from "./forecast.mapper.js";

// Log the provider failure (full detail stays on the server) and throw an AppError for the client.
function toProviderError(err, city) {
  console.error("Weather provider error:", err.message);

  if (axios.isAxiosError(err) && err.response?.status === 400) {
    throw new AppError(404, `City '${city}' not found`);
  }
  throw new AppError(502, "Weather provider is unavailable");
}

export async function getForecast(city) {
  const { data } = await axios
    .get(env.WEATHER_API_URL, {
      params: { key: env.WEATHER_API_KEY, q: city, days: 7, aqi: "yes" },
      timeout: 8000,
    })
    .catch((err) => toProviderError(err, city));

  return mapForecast(data);
}
