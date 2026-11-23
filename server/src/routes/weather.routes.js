// src/routes/weather.routes.js
import { Router } from "express";
import { validateCity } from "../middleware/validateCity.js";
import { getForecast } from "../controllers/weather.controller.js";

const router = Router();

// Mounted at /api/weather, so this is GET /api/weather/forecast
router.get("/forecast", validateCity, getForecast);

export default router;
