// src/routes/weather.routes.js
import { Router } from "express";
import { validateCity } from "../middleware/validateCity.js";
import { getCurrent, getForecast } from "../controllers/weather.controller.js";

const router = Router();

// Mounted at /api/weather, so these are GET /api/weather/current and /api/weather/forecast
router.get("/current", validateCity, getCurrent);
router.get("/forecast", validateCity, getForecast);

export default router;