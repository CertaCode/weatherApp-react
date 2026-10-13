import * as weatherService from "../services/weather.service.js";

export async function getCurrent(req, res) {
  const weather = await weatherService.getCurrentWeather(res.locals.city);
  res.json(weather);
}