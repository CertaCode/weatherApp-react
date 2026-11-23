import { api } from "./api";

export default async function getForecast(city, signal) {
  const { data } = await api.get("/weather/forecast", {
    params: { city },
    signal,
  });
  return data;
}
