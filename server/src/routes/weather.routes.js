// src/routes/weather.routes.js
import { Router } from "express";
import { validateCity } from "../middleware/validateCity.js";
import { getCurrent } from "../controllers/weather.controller.js";

const router = Router();

// Mounted at /api/weather, so this is GET /api/weather/current
router.get("/current", validateCity, getCurrent);

export default router;