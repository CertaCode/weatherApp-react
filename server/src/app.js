import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import weatherRoutes from "./routes/weather.routes.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Runs for EVERY request, in this order
app.use(helmet());                                   // safe HTTP headers
app.use(cors({ origin: env.CLIENT_ORIGIN }));        // only your frontend may call
app.use(express.json());                             // parse JSON bodies
app.use("/api", rateLimit({ windowMs: 60_000, limit: 60 })); // 60 req/min per IP

app.get("/health", (req, res) => {
  console.log("Health check: Passed!");
  res.json({ status: "ok" });
});

// Routes
app.use("/api/weather", weatherRoutes);

// These two must come LAST
app.use(notFound);
app.use(errorHandler);

export default app;