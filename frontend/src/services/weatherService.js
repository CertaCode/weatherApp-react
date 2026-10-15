import { api } from "./api";

export default async function getCurrentWeather(city) {
  const { data } = await api.get("/weather/current", {
    params: { city: city },
  });
  return data;
}