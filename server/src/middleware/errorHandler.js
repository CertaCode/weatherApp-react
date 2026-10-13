// src/middleware/errorHandler.js
import { AppError } from "../utils/AppError.js";

// Express recognizes error handlers by having exactly FOUR parameters
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message });
  }

  console.error(err);   // unexpected bug: log it, hide the details
  res.status(500).json({ error: "Internal server error" });
}