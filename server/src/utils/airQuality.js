// US EPA Air Quality Index categories, as returned by WeatherAPI ("us-epa-index" 1-6)
const LEVELS = Object.freeze({
  1: { label: "Good", severity: "good" },
  2: { label: "Moderate", severity: "moderate" },
  3: { label: "Unhealthy for sensitive groups", severity: "sensitive" },
  4: { label: "Unhealthy", severity: "unhealthy" },
  5: { label: "Very unhealthy", severity: "very-unhealthy" },
  6: { label: "Hazardous", severity: "hazardous" },
});

/**
 * Convert a US EPA index (1-6) into a label and a severity key.
 * Returns null when the value is missing or outside 1-6,
 * so the caller can decide what to show.
 */
export function getAirQuality(epaIndex) {
  const index = Number(epaIndex);
  const level = LEVELS[index];

  return level ? { index, ...level } : null;
}