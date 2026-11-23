import * as weatherService from "../services/weather.service.js";

export async function getForecast(req, res) {
  const forecast = await weatherService.getForecast(res.locals.city);
  res.json(forecast);
}
