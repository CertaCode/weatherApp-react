import { AppError } from "../utils/AppError.js";

export function validateCity(req, res, next) {
  const city = String(req.query.city ?? "").trim();

  if (!city) throw new AppError(400, "Query parameter 'city' is required");
  if (city.length > 60) throw new AppError(400, "City name is too long");
  if (!/^[\p{L}\p{M}\s.,'-]+$/u.test(city)) {
    throw new AppError(400, "City name contains invalid characters");
  }

  res.locals.city = city;   // pass the cleaned value to the next handler
  next();                   // continue to the controller
}